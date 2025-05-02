import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import { customerToCustomerDto } from './mapper/customer.mapper';
import { WhatsAppService } from 'src/sms/whatsapp.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly whatsAppService: WhatsAppService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    if (createCustomerDto.type === 'WhatsApp') {
      console.log('send a whatsapp message ....');
      const result = await this.whatsAppService.sendTextMessage(
        createCustomerDto.phone,
        'test message',
      );
      console.log(result);
      return result;
    }

    try {
      const result = await this.prismaService.customer.create({
        data: {
          ...createCustomerDto,
          password: bcrypt.hashSync(createCustomerDto.password, 12),
        },
      });
      const customerDto: CustomerDto = {
        id: result.id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        longitude: result.longitude,
        latitude: result.latitude,
        image: result.image,
        createdAt: result.createdAt,
      };
      return customerDto;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        }
      }
      console.log('from catch: ', error);
      throw new ConflictException(error.meta.target[0] + ' already exists');
    }
  }

  findAll() {
    return `This action returns all client`;
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.customer.findUnique({
        where: { id },
      });
      if (!user) {
        return null;
      }
      const userDto = customerToCustomerDto(user);
      return userDto;
    } catch (error) {
      console.log('from customerService findOne: ', error);
      return null;
    }
  }

  async findOneByEmail(email: string): Promise<Customer | null> {
    try {
      const result = await this.prismaService.customer.findUnique({
        where: { email },
      });
      return result;
    } catch (error) {
      console.log('from customerService findOneByEmail: ', error);
      return null;
    }
  }

  // update(id: number, updateClientDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} client`;
  // }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
