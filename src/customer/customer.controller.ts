import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  createCustomerSchema,
} from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { AuthGuard } from 'src/auth/auth.guard';
import { CustomerGuard } from 'src/shared/guards/customer.guard';
import { Request as ExpressRequest } from 'express';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('subscribe')
  @UsePipes(new ZodValidationPipe(createCustomerSchema))
  create(@Body() createCustomerDto: CreateCustomerDto) {
    console.log('trying to subscribe');
    console.log('createCustomerDto: ', createCustomerDto);
    if (createCustomerDto.type === 'WhatsApp') {
      console.log('send a whatsapp message ....');
    }
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard, CustomerGuard)
  getProfile(@Request() req: ExpressRequest) {
    return this.customerService.findOne(req['payload'].sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard, CustomerGuard)
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCustomerDto: UpdateCustomerDto,
  // ) {
  //   return this.customerService.update(+id, updateCustomerDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
