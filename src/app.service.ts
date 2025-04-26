import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createContactRequest(contactRequest: ContactRequest) {
    const result = await this.prismaService.contactRequest.create({
      data: contactRequest,
    });
    return result;
  }
  async getServices() {
    const result = await this.prismaService.service.findMany();
    return result;
  }
}
