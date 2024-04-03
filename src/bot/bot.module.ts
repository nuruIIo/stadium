import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './entities/bot.entity';

@Module({
  imports: [SequelizeModule.forFeature([Bot])],
  providers: [BotService, BotUpdate],
  exports: [BotService]
})
export class BotModule {}
