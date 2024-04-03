import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media)
    private readonly mediaRepository: typeof Media,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    return await this.mediaRepository.create(createMediaDto);
  }

  async findAll() {
    return await this.mediaRepository.findAll();
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findByPk(id);
    if (!media) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const [rowsUpdated, [updatedMedia]] = await this.mediaRepository.update(
      updateMediaDto,
      { where: { id }, returning: true },
    );
    if (!rowsUpdated) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return updatedMedia;
  }

  async remove(id: number) {
    const rowsDeleted = await this.mediaRepository.destroy({ where: { id } });
    if (!rowsDeleted) {
      throw new NotFoundException(`Media with id ${id} not found`);
    }
    return { rowsDeleted };
  }
}
