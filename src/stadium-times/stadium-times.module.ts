import { Module } from '@nestjs/common';
import { StadiumTimesService } from './stadium-times.service';
import { StadiumTimesController } from './stadium-times.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StadiumTimes } from './entities/stadium-time.entity';

@Module({
  imports: [SequelizeModule.forFeature([StadiumTimes])],
  controllers: [StadiumTimesController],
  providers: [StadiumTimesService],
})
export class StadiumTimesModule {}
