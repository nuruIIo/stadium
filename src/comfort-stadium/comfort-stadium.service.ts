import { Injectable } from '@nestjs/common';
import { CreateComfortStadiumDto } from './dto/create-comfort-stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort-stadium.dto';

@Injectable()
export class ComfortStadiumService {
  create(createComfortStadiumDto: CreateComfortStadiumDto) {
    return 'This action adds a new comfortStadium';
  }

  findAll() {
    return `This action returns all comfortStadium`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comfortStadium`;
  }

  update(id: number, updateComfortStadiumDto: UpdateComfortStadiumDto) {
    return `This action updates a #${id} comfortStadium`;
  }

  remove(id: number) {
    return `This action removes a #${id} comfortStadium`;
  }
}
