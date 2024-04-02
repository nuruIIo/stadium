import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionRepo: typeof Region,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      return await this.regionRepo.create(createRegionDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create region.');
    }
  }

  async findAll() {
    try {
      return await this.regionRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve regions.');
    }
  }

  async findOne(id: number) {
    try {
      const region = await this.regionRepo.findByPk(id);
      if (!region) {
        throw new NotFoundException('Region not found.');
      }
      return region;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve region.');
    }
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      const [rowsUpdated] = await this.regionRepo.update(updateRegionDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Region not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update region.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.regionRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Region not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete region.');
    }
  }
}
