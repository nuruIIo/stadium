import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  userId: number;
  stadiumTimesId: number;
  date: Date;
  status: string;
}
