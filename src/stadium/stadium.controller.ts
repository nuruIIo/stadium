import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';

@Controller('stadium')
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) {}

  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumService.create(createStadiumDto);
  }

  @Get()
  findAll() {
    return this.stadiumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumService.update(+id, updateStadiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumService.remove(+id);
  }
}
