import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService, MailService],
  exports: [AdminService],
})
export class AdminModule {}
