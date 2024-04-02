import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsPhoneNumber('UZ')
  phone?: string;

  @IsEmail()
  email?: string;

  tg_link?: string;
}
