import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StadiumTimesService } from './stadium-times.service';
import { CreateStadiumTimeDto } from './dto/create-stadium-time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium-time.dto';
import { StadiumTimes } from './entities/stadium-time.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stadium Times')
@Controller('stadium-times')
export class StadiumTimesController {
  constructor(private readonly stadiumTimesService: StadiumTimesService) {}

  @ApiOperation({ summary: 'Create a new stadium time' })
  @Post()
  create(
    @Body() createStadiumTimeDto: CreateStadiumTimeDto,
  ): Promise<StadiumTimes> {
    return this.stadiumTimesService.create(createStadiumTimeDto);
  }

  @ApiOperation({ summary: 'Get all stadium times' })
  @Get()
  findAll(): Promise<StadiumTimes[]> {
    return this.stadiumTimesService.findAll();
  }

  @ApiOperation({ summary: 'Get a stadium time by ID' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<StadiumTimes> {
    return this.stadiumTimesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a stadium time by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStadiumTimeDto: UpdateStadiumTimeDto,
  ): Promise<StadiumTimes> {
    return this.stadiumTimesService.update(+id, updateStadiumTimeDto);
  }

  @ApiOperation({ summary: 'Delete a stadium time by ID' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ rowsDeleted: number }> {
    return this.stadiumTimesService.remove(+id);
  }
}
