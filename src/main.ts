import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';


async function start() {
  try {
    const config = new DocumentBuilder()
    .setTitle('stadium finder')
    .setDescription('mini project for stadium finder')
    .setVersion('1.0.0')
    .addTag('Nodejs, NestJS, Postgres, Sequelize, JWT, Swagger, Bot, SMS, Mailer')
    .build()
    const PORT = process.env.PORT || 3000
    const app = await NestFactory.create(AppModule)
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/docs', app, document)
    app.use(cookieParser())
    app.setGlobalPrefix('api')
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();
