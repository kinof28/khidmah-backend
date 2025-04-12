import { CustomerDto } from '../dto/customer.dto';

const customerToCustomerDto = (customer) => {
  const customerDto: CustomerDto = {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    location: customer.longitude + ',' + customer.latitude,
  };
  return customerDto;
};

export default customerToCustomerDto;
