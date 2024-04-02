import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // Correct import path for HandlebarsAdapter

@Module({
  imports: [
    ConfigModule, // Import ConfigModule for accessing environment variables
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule for async configuration
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAILER_HOST'),
          secure: false,
          auth: {
            user: config.get<string>('MAILDEV_USER'),
            pass: config.get<string>('MAILDEV_PASS'),
          },
        },
        defaults: {
          from: `"Stadium" <${config.get('MAILER_HOST')}>`, // Fix from address formatting
        },
        template: {
          dir: join(process.cwd(), 'src', 'mail', 'templates'),
          adapter: new HandlebarsAdapter(), // Correct import path for HandlebarsAdapter
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
