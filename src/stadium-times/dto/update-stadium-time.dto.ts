import { PartialType } from '@nestjs/swagger';
import { CreateStadiumTimeDto } from './create-stadium-time.dto';
import { IsNumber } from 'class-validator';

export class UpdateStadiumTimeDto extends PartialType(CreateStadiumTimeDto) {
  @IsNumber()
  stadiumId: number;

  start_time: Date;
  end_time: Date;
  price: number;
}
