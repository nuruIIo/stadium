import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    // Generate access and refresh tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('The email is already in use');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      password: passwordHash,
    });

    // Generate tokens and activation link
    const tokens = await this.getTokens(newUser);
    const refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const activation_link = v4();

    // Update user with refresh token and activation link
    const updatedUser = await this.userRepo.update(
      {
        refresh_token,
        activation_link,
      },
      { where: { id: newUser.id }, returning: true },
    );

    // Set refresh token cookie
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // Send activation email
    try {
      await this.mailService.sendMailtoUser(updatedUser[1][0]);
    } catch (error) {
      console.error('Error in sending email:', error);
      throw new InternalServerErrorException(
        'Error in sending activation email',
      );
    }

    // Prepare response
    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async activate(link: string) {
    if (!link) throw new BadRequestException('Activation link not provided');
    const updated = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updated[1][0]) throw new BadRequestException('User already activated');
    const response = {
      message: 'User activated successfully',
      user: updated[1][0].is_active,
    };
    return response;
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new BadRequestException('User not found');
    if (!user.is_active) throw new BadRequestException('User is not active');

    // Check password
    const isMatchpass = await bcrypt.compare(password, user.password);
    if (!isMatchpass) {
      throw new BadRequestException('Password do not match');
    }

    // Generate tokens and refresh token hash
    const tokens = await this.getTokens(user);
    const refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    // Update user with new refresh token
    const updatedUser = await this.userRepo.update(
      { refresh_token },
      { where: { id: user.id }, returning: true },
    );

    // Set refresh token cookie
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // Prepare response
    const response = {
      message: 'User logged',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async logOut(refreshToken: string, res: Response) {
    // Verify refresh token
    const userdata = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userdata) throw new ForbiddenException('Token not found');

    // Clear refresh token
    await this.userRepo.update(
      { refresh_token: null },
      { where: { id: userdata.id }, returning: true },
    );
    res.clearCookie('refresh_token');

    // Prepare response
    const response = {
      message: 'User logged Out successfully',
    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    // Decode refresh token
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('User not matched');
    }
    const user = await this.userRepo.findByPk(userId);
    if (!user || !user.refresh_token) {
      throw new BadRequestException('Refresh token not found');
    }

    // Compare refresh token hash
    const isMatchedtoken = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );
    if (!isMatchedtoken) throw new ForbiddenException('Forbidden');

    // Generate new tokens and refresh token hash
    const tokens = await this.getTokens(user);
    const refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    // Update user with new refresh token
    const updatedUser = await this.userRepo.update(
      { refresh_token },
      { where: { id: user.id }, returning: true },
    );

    // Set refresh token cookie
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // Prepare response
    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  async findUser(findUserDto: FindUserDto) {
    const where = {};
    if (findUserDto.name) {
      where['name'] = { [Op.like]: `%${findUserDto.name}` };
    }

    if (findUserDto.email) {
      where['email'] = { [Op.like]: `%${findUserDto.email}` };
    }

    if (findUserDto.phone) {
      where['phone'] = { [Op.like]: `%${findUserDto.phone}` };
    }

    if (findUserDto.tg_link) {
      where['tg_link'] = { [Op.like]: `%${findUserDto.tg_link}` };
    }

    const users = await this.userRepo.findAll({ where });

    if (users.length == 0) {
      throw new BadRequestException('user not found');
    }

    return users;
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  findAll() {
    return this.userRepo.findAll();
  }

  findOne(id: number) {
    return 'This action returns a #${id} user';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return 'This action updates a #${id} user';
  }

  remove(id: number) {
    return 'This action removes a #${id} user';
  }
}
