import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import adminToAdminDto from './mapper/admin.mapper';
import { MailService } from 'src/mail/mail.service';
import { customersToCustomerDtos } from 'src/customer/mapper/customer.mapper';
import { providersToProvidersDto } from 'src/provider/mapper/provider.mapper';
import { UpdateEmailDto } from './dto/update-email.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import CreateServiceDto from './dto/create-service.dto';
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
    this.mailService.replyToContactRequest(
      result.email,
      reply.subject,
      reply.body,
    );
    return result;
  }
  async generateStatistics() {
    const servicesCount = await this.prismaService.service.count();
    const providersCount = await this.prismaService.provider.count();
    const customersCount = await this.prismaService.customer.count();
    const providersRequestsCount =
      await this.prismaService.providerRequest.count();
    const bookingsCount = await this.prismaService.booking.count();
    const mailsCount = await this.prismaService.contactRequest.count();
    return {
      servicesCount,
      providersCount,
      customersCount,
      providersRequestsCount,
      bookingsCount,
      mailsCount,
    };
  }

  async getCustomers() {
    const result = await this.prismaService.customer.findMany();
    return customersToCustomerDtos(result);
  }
  async getProviders() {
    const result = await this.prismaService.provider.findMany();
    return providersToProvidersDto(result);
  }

  async updateEmail(id: number, updateEmailDto: UpdateEmailDto) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    });
    if (
      !admin ||
      !bcrypt.compareSync(updateEmailDto.password, admin.password)
    ) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const result = await this.prismaService.admin.update({
      where: { id },
      data: {
        email: updateEmailDto.email,
      },
    });
    return adminToAdminDto(result);
  }
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    });
    if (
      !admin ||
      !bcrypt.compareSync(updatePasswordDto.oldPassword, admin.password)
    ) {
      throw new UnauthorizedException('Password is incorrect');
    }
    const result = await this.prismaService.admin.update({
      where: { id },
      data: {
        password: bcrypt.hashSync(updatePasswordDto.newPassword, 12),
      },
    });
    return adminToAdminDto(result);
  }

  async getServices() {
    const result = await this.prismaService.service.findMany();
    return result;
  }
  async createService(createServiceDto: CreateServiceDto) {
    console.log('createServiceDto: ', createServiceDto);
    const result = await this.prismaService.service.create({
      data: createServiceDto,
    });
    return result;
  }
}
