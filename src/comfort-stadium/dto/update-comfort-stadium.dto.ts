import { PartialType } from '@nestjs/swagger';
import { CreateComfortStadiumDto } from './create-comfort-stadium.dto';

export class UpdateComfortStadiumDto extends PartialType(CreateComfortStadiumDto) {}
