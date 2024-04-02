import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Comfort') // Tag for Swagger documentation
@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @ApiOperation({ summary: 'Create a new comfort level' }) // Swagger documentation
  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.create(createComfortDto);
  }

  @ApiOperation({ summary: 'Get all comfort levels' }) // Swagger documentation
  @Get()
  findAll() {
    return this.comfortService.findAll();
  }

  @ApiOperation({ summary: 'Get a specific comfort level by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'Comfort level ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a comfort level by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'Comfort level ID' })
  @ApiBody({ type: UpdateComfortDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.update(+id, updateComfortDto);
  }

  @ApiOperation({ summary: 'Delete a comfort level by ID' }) // Swagger documentation
  @ApiParam({ name: 'id', description: 'Comfort level ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortService.remove(+id);
  }
}
