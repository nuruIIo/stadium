import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './entities/media.entity';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @ApiOperation({ summary: 'Create a new media' })
  @Post()
  async create(@Body() createMediaDto: CreateMediaDto): Promise<Media> {
    return this.mediaService.create(createMediaDto);
  }

  @ApiOperation({ summary: 'Get all media' })
  @Get()
  async findAll(): Promise<Media[]> {
    return this.mediaService.findAll();
  }

  @ApiOperation({ summary: 'Get a media by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Media> {
    return this.mediaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a media by ID' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ): Promise<Media> {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @ApiOperation({ summary: 'Delete a media by ID' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ rowsDeleted: number }> {
    return this.mediaService.remove(+id);
  }
}
