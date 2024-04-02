import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfortStadiumService } from './comfort-stadium.service';
import { CreateComfortStadiumDto } from './dto/create-comfort-stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort-stadium.dto';

@Controller('comfort_stadium')
export class ComfortStadiumController {
  constructor(private readonly comfortStadiumService: ComfortStadiumService) {}

  @Post()
  create(@Body() createComfortStadiumDto: CreateComfortStadiumDto) {
    return this.comfortStadiumService.create(createComfortStadiumDto);
  }

  @Get()
  findAll() {
    return this.comfortStadiumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortStadiumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComfortStadiumDto: UpdateComfortStadiumDto) {
    return this.comfortStadiumService.update(+id, updateComfortStadiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortStadiumService.remove(+id);
  }
}
