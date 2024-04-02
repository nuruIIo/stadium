import { PartialType } from '@nestjs/swagger';
import { CreateStadiumDto } from './create-stadium.dto';

export class UpdateStadiumDto extends PartialType(CreateStadiumDto) {
  categoryId: number;
  ownerId: number;
  contact_with: string;
  name: string;
  volume: string;
  districtId: number;
  location: string;
  buildAt: string;
  start: Date;
  end: Date;
}
