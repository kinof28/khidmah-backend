import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  Delete,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import CreateServiceDto from './dto/create-service.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // get admin profile
  @Get('profile')
  @UseGuards(AuthGuard, AdminGuard)
  getProfile(@Request() req: ExpressRequest) {
    return this.adminService.findOne(req['payload'].sub);
  }

  @Get('statistics')
  @UseGuards(AuthGuard, AdminGuard)
  getStatistics() {
    return this.adminService.generateStatistics();
  }
  @Get('contacts')
  @UseGuards(AuthGuard, AdminGuard)
  getContactRequests() {
    return this.adminService.getContactRequests();
  }

  @Get('contacts/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleContactRequest(@Param('id') id: number) {
    return this.adminService.getContactRequestsById(+id);
  }

  @Delete('contacts/:id')
  @UseGuards(AuthGuard, AdminGuard)
  deleteContactRequest(@Param('id') id: number) {
    return this.adminService.deleteContactRequestsById(+id);
  }
  @Post('contacts/:id/reply')
  @UseGuards(AuthGuard, AdminGuard)
  replyToContactRequest(@Param('id') id: number, @Body() reply) {
    return this.adminService.replyToContactRequest(+id, reply);
  }

  @Get('customers')
  @UseGuards(AuthGuard, AdminGuard)
  getCustomers() {
    const result = this.adminService.getCustomers();
    return result;
  }

  @Get('customers/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleCustomer(@Param('id') id: number) {}

  @Get('providers')
  @UseGuards(AuthGuard, AdminGuard)
  getProviders() {
    const result = this.adminService.getProviders();
    return result;
  }
  @Put('update-email')
  @UseGuards(AuthGuard, AdminGuard)
  updateEmail(
    @Request() req: ExpressRequest,
    @Body() updateEmailDto: UpdateEmailDto,
  ) {
    return this.adminService.updateEmail(req['payload'].sub, updateEmailDto);
  }

  @Put('update-password')
  @UseGuards(AuthGuard, AdminGuard)
  updatePassword(
    @Request() req: ExpressRequest,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.adminService.updatePassword(
      req['payload'].sub,
      updatePasswordDto,
    );
  }

  @Get('providers/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleProvider(@Param('id') id: number) {}

  @Get('provider-requests')
  @UseGuards(AuthGuard, AdminGuard)
  getProviderRequests() {}

  @Get('provider-requests/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleProviderRequest(@Param('id') id: number) {}

  @Get('services')
  @UseGuards(AuthGuard, AdminGuard)
  getServices() {
    const result = this.adminService.getServices();
    return result;
  }

  @Post('services')
  @UseGuards(AuthGuard, AdminGuard)
  createService(@Body() createServiceDto: CreateServiceDto) {
    return this.adminService.createService(createServiceDto);
  }

  @Get('services/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleService(@Param('id') id: number) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
}
