import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepo.create(createCategoryDto);
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to create category.');
    }
  }

  async findAll() {
    try {
      return await this.categoryRepo.findAll();
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve categories.');
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepo.findByPk(id);
      if (!category) {
        throw new NotFoundException('Category not found.');
      }
      return category;
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to retrieve category.');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const [rowsUpdated] = await this.categoryRepo.update(updateCategoryDto, {
        where: { id },
      });
      if (!rowsUpdated) {
        throw new NotFoundException('Category not found.');
      }
      return { rowsUpdated };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to update category.');
    }
  }

  async remove(id: number) {
    try {
      const rowsDeleted = await this.categoryRepo.destroy({ where: { id } });
      if (!rowsDeleted) {
        throw new NotFoundException('Category not found.');
      }
      return { rowsDeleted };
    } catch (error) {
      // Handle database errors
      throw new Error('Failed to delete category.');
    }
  }
}
