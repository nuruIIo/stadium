import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ComfortModule } from './comfort/comfort.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { CategoriesModule } from './categories/categories.module';
import { AdminModule } from './admin/admin.module';
import { Comfort } from './comfort/entities/comfort.entity';
import { District } from './district/entities/district.entity';
import { Category } from './categories/entities/category.entity';
import { Admin } from './admin/entities/admin.entity';
import { StadiumModule } from './stadium/stadium.module';
import { MediaModule } from './media/media.module';
import { ComfortStadiumModule } from './comfort-stadium/comfort-stadium.module';
import { Region } from './region/entities/region.entity';
import { Stadium } from './stadium/entities/stadium.entity';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { CommentsModule } from './comments/comments.module';
import { StadiumTimesModule } from './stadium-times/stadium-times.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { Media } from './media/entities/media.entity';
import { Comment } from './comments/entities/comment.entity';
import { Bot } from './bot/entities/bot.entity';
import { Order } from './orders/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';


@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({token: process.env.BOT_TOKEN, middlewares: [], include: [BotModule]})
    }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Comfort, District, Category, Admin, Region, Stadium, Media, Comment, Bot, Order, Cart],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    RegionModule,
    DistrictModule,
    CategoriesModule,
    AdminModule,
    StadiumModule,
    MediaModule,
    ComfortStadiumModule,
    BotModule,
    CommentsModule,
    StadiumTimesModule,
    OrdersModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
