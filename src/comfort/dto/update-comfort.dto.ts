import { PartialType } from '@nestjs/swagger';
import { CreateComfortDto } from './create-comfort.dto';

export class UpdateComfortDto extends PartialType(CreateComfortDto) {
  name: string;
}
