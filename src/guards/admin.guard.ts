import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized admin');
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized admin');
    }

    async function verify(token: string, jwtService: JwtService) {
      let admin: any;
      try {
        admin = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }

      if (!admin) {
        throw new UnauthorizedException('Unauthorized admin');
      }

      if (!admin.is_active) {
        throw new BadRequestException('admin is not active');
      }

      req.admin = admin;
      return true;
    }

    return verify(token, this.jwtService);
  }
}
