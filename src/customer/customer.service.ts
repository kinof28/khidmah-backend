import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const result = await this.prismaService.customer.create({
        data: {
          ...createCustomerDto,
          password: bcrypt.hashSync(createCustomerDto.password, 10),
        },
      });
      const customerDto: CustomerDto = {
        id: result.id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        location: result.location,
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
    // .then((res) => {
    //   console.log(res);
    //   return res;
    // })
    // .catch((err) => {
    //   console.log(err);
    //   return new ConflictException(err.message);
    // });
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  // update(id: number, updateClientDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} client`;
  // }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
