import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import adminToAdminDto from './mapper/admin.mapper';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
  ) {}

  findOneByEmail(email: string) {
    try {
      const result = this.prismaService.admin.findUnique({
        where: { email },
      });
      return result;
    } catch (error) {
      console.log('from adminService findOneByEmail: ', error);
      return null;
    }
  }

  async findOne(id: number) {
    const result = await this.prismaService.admin.findUnique({
      where: { id },
    });
    return adminToAdminDto(result);
  }
  async getContactRequests() {
    const result = await this.prismaService.contactRequest.findMany();
    return result;
  }
  async getContactRequestsById(id: number) {
    const result = await this.prismaService.contactRequest.findUnique({
      where: { id },
    });
    return result;
  }
  async deleteContactRequestsById(id: number) {
    const result = await this.prismaService.contactRequest.delete({
      where: { id },
    });
    return result;
  }
  async replyToContactRequest(id: number, reply) {
    const result = await this.prismaService.contactRequest.update({
      where: { id },
      data: {
        replied: true,
      },
    });
    // Todo: send email
    // this.mailService.sendWelcomeEmail('ab28fb@gmail.com', 'Abdelwahab dev');
    this.mailService.replyToContactRequest(
      result.email,
      reply.subject,
      reply.body,
    );
    return result;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }
}
