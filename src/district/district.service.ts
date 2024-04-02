import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtRepo: typeof District,
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    try {
      return await this.districtRepo.create(createDistrictDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create district.');
    }
  }

  async findAll() {
    try {
      return await this.districtRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve districts.');
    }
  }

  async findOne(id: number) {
    try {
      const district = await this.districtRepo.findByPk(id);
      if (!district) {
        throw new NotFoundException('District not found.');
      }
      return district;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve district.');
    }
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    try {
      const [rowsUpdated] = await this.districtRepo.update(updateDistrictDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('District not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update district.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.districtRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('District not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete district.');
    }
  }
}
