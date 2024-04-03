import { PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  userId: number;
  stadiumTimesId: number;
  date: Date;
  time_for_clear: Date;
  status: string;
}
