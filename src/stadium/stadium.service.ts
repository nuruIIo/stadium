import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from './entities/stadium.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('stadiums')
@Injectable()
export class StadiumService {
  constructor(
    @InjectModel(Stadium)
    private readonly stadiumRepo: typeof Stadium,
  ) {}

  @ApiOkResponse({ description: 'Stadium created successfully' })
  async create(createStadiumDto: CreateStadiumDto) {
    try {
      return await this.stadiumRepo.create(createStadiumDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create stadium.');
    }
  }

  @ApiOkResponse({ description: 'Retrieved all stadiums successfully' })
  async findAll() {
    try {
      return await this.stadiumRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve stadiums.');
    }
  }

  @ApiOkResponse({ description: 'Stadium found successfully' })
  @ApiNotFoundResponse({ description: 'Stadium not found' })
  async findOne(id: number) {
    try {
      const stadium = await this.stadiumRepo.findByPk(id);
      if (!stadium) {
        throw new NotFoundException('Stadium not found.');
      }
      return stadium;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve stadium.');
    }
  }

  @ApiOkResponse({ description: 'Stadium updated successfully' })
  @ApiNotFoundResponse({ description: 'Stadium not found' })
  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    try {
      const [rowsUpdated] = await this.stadiumRepo.update(updateStadiumDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Stadium not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update stadium.');
    }
  }

  @ApiOkResponse({ description: 'Stadium removed successfully' })
  @ApiNotFoundResponse({ description: 'Stadium not found' })
  async remove(id: number) {
    try {
      const rowsDeleted = await this.stadiumRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Stadium not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete stadium.');
    }
  }
}
