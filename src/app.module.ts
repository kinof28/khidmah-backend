import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { AdminModule } from './admin/admin.module';
import { ProviderModule } from './provider/provider.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail/mail.service';
import { WhatsAppService } from './sms/whatsapp.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CustomerModule,
    AdminModule,
    ProviderModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.APP_EMAIL,
          pass: process.env.APP_EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.APP_EMAIL,
      },
      template: {
        dir: __dirname.replace('dist', '') + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MailService, WhatsAppService],
  exports: [PrismaService],
})
export class AppModule {}
