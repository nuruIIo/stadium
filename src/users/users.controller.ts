import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { UserGuard } from '../guards/user.guard';
// import { Response } from 'express';

@ApiTags('USers')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, type: User })
  @Post('signUp')
  create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }
  @HttpCode(200)
  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }
  @UseGuards(UserGuard)
  @Post('logOut')
  logOut(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    return this.usersService.logOut(refreshToken, res);
  }

  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
