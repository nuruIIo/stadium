import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @IsNumber()
  stadiumId: number;

  @IsString()
  photo: string;

  @IsString()
  description: string;
}
