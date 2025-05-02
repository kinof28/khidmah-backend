import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { PrismaService } from 'src/prisma.service';
import { WhatsAppService } from 'src/sms/whatsapp.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService, WhatsAppService],
  exports: [CustomerService],
})
export class CustomerModule {}
