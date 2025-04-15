import { Customer } from '@prisma/client';
import { CustomerDto } from '../dto/customer.dto';

const customerToCustomerDto = (customer: Customer) => {
  const customerDto: CustomerDto = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    longitude: customer.longitude,
    latitude: customer.latitude,
    image: customer.image,
    createdAt: customer.createdAt,
  };
  return customerDto;
};
const customersToCustomerDtos = (customers: Customer[]) => {
  const customerDtos: CustomerDto[] = [];
  customers.forEach((customer) => {
    customerDtos.push(customerToCustomerDto(customer));
  });
  return customerDtos;
};

export { customerToCustomerDto, customersToCustomerDtos };
