import { Module } from '@nestjs/common';
import { ComfortStadiumService } from './comfort-stadium.service';
import { ComfortStadiumController } from './comfort-stadium.controller';

@Module({
  controllers: [ComfortStadiumController],
  providers: [ComfortStadiumService],
})
export class ComfortStadiumModule {}
