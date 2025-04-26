import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { CustomerGuard } from './shared/guards/customer.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('services')
  @UseGuards(AuthGuard)
  getServices() {
    const result = this.appService.getServices();
    return result;
  }

  @Post('contact')
  contact(@Body() contactRequest: ContactRequest) {
    this.appService.createContactRequest(contactRequest);
    return {
      status: 'success',
    };
  }
}
