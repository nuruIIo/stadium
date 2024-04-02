import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('stadium')
@Controller('stadium')
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) {}

  @ApiOperation({ summary: 'Create a new stadium' })
  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumService.create(createStadiumDto);
  }

  @ApiOperation({ summary: 'Get all stadiums' })
  @Get()
  findAll() {
    return this.stadiumService.findAll();
  }

  @ApiOperation({ summary: 'Get a stadium by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a stadium by ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumService.update(+id, updateStadiumDto);
  }

  @ApiOperation({ summary: 'Delete a stadium by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumService.remove(+id);
  }
}
