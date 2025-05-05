import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma.service';
import { WhatsAppService } from 'src/sms/whatsapp.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, WhatsAppService, MailService],
  exports: [CustomerService],
})
export class CustomerModule {}
