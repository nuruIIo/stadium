import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminRepo: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      return await this.adminRepo.create(createAdminDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create admin.');
    }
  }

  async findAll() {
    try {
      return await this.adminRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve admins.');
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.adminRepo.findByPk(id);
      if (!admin) {
        throw new NotFoundException('Admin not found.');
      }
      return admin;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve admin.');
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const [rowsUpdated] = await this.adminRepo.update(updateAdminDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Admin not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update admin.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.adminRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Admin not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete admin.');
    }
  }
}
