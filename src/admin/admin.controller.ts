import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
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
    console.log('req.payload: ', req['payload']);
    return this.adminService.findOne(req['payload'].sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
}
