import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  tg_link: string;

  @IsString()
  photo: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  is_active: boolean;

  @IsBoolean()
  is_creator: boolean;

  @IsString()
  token: string;
}
