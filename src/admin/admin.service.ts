import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma.service';
import adminToAdminDto from './mapper/admin.mapper';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

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
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
