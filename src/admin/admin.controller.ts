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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/shared/guards/admin.guard';

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
  getCustomers() {}

  @Get('customers/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleCustomer(@Param('id') id: number) {}

  @Get('providers')
  @UseGuards(AuthGuard, AdminGuard)
  getProviders() {}

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
  getServices() {}

  @Get('services/:id')
  @UseGuards(AuthGuard, AdminGuard)
  getSingleService(@Param('id') id: number) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
}
