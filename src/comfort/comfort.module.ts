import { Module } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { ComfortController } from './comfort.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comfort } from './entities/comfort.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comfort])],
  controllers: [ComfortController],
  providers: [ComfortService],
})
export class ComfortModule {}
