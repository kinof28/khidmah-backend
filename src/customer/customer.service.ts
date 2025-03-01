import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
  create(createCustomerDto: CreateCustomerDto) {
    console.log(
      'trying to create a customer with following data: ',
      createCustomerDto,
    );
    return 'This action adds a new client';
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
