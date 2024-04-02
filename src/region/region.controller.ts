import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Region } from './entities/region.entity';

@ApiTags('Region') // Tag for Swagger documentation
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create a new region' }) // Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The region has been successfully created.',
    type: Region,
  })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Get all regions' }) // Swagger documentation
  @ApiResponse({
    status: 200,
    description: 'List of all regions.',
    type: [Region],
  })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific region by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'Region ID' })
  @ApiResponse({ status: 200, description: 'The found region.', type: Region })
  @ApiResponse({ status: 404, description: 'Region not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a region by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'Region ID' })
  @ApiBody({ type: UpdateRegionDto })
  @ApiResponse({
    status: 200,
    description: 'The updated region.',
    type: Region,
  })
  @ApiResponse({ status: 404, description: 'Region not found.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'Delete a region by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'Region ID' })
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Region not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
