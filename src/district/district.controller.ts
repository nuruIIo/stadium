import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { District } from './entities/district.entity';

@ApiTags('District') // Tag for Swagger documentation
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Create a new district' }) // Swagger documentation
  @ApiResponse({
    status: 201,
    description: 'The district has been successfully created.',
    type: District,
  })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'Get all districts' }) // Swagger documentation
  @ApiResponse({
    status: 200,
    description: 'List of all districts.',
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific district by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'District ID' })
  @ApiResponse({
    status: 200,
    description: 'The found district.',
    type: District,
  })
  @ApiResponse({ status: 404, description: 'District not found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a district by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'District ID' })
  @ApiBody({ type: UpdateDistrictDto })
  @ApiResponse({
    status: 200,
    description: 'The updated district.',
    type: District,
  })
  @ApiResponse({ status: 404, description: 'District not found.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'Delete a district by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'District ID' })
  @ApiResponse({
    status: 200,
    description: 'The district has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'District not found.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}
