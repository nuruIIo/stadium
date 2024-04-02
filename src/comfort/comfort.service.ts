import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './entities/comfort.entity';

@Injectable()
export class ComfortService {
  constructor(
    @InjectModel(Comfort) private readonly comfortRepo: typeof Comfort,
  ) {}

  async create(createComfortDto: CreateComfortDto) {
    try {
      return await this.comfortRepo.create(createComfortDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create comfort level.');
    }
  }

  async findAll() {
    try {
      return await this.comfortRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve comfort levels.');
    }
  }

  async findOne(id: number) {
    try {
      const comfort = await this.comfortRepo.findByPk(id);
      if (!comfort) {
        throw new NotFoundException('Comfort level not found.');
      }
      return comfort;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve comfort level.');
    }
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    try {
      const [rowsUpdated] = await this.comfortRepo.update(updateComfortDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Comfort level not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update comfort level.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.comfortRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Comfort level not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete comfort level.');
    }
  }
}
