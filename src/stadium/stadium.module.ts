import { Module } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { StadiumController } from './stadium.controller';

@Module({
  controllers: [StadiumController],
  providers: [StadiumService],
})
export class StadiumModule {}
