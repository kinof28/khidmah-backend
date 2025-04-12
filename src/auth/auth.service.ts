import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import { CustomerService } from 'src/customer/customer.service';
import { ProviderService } from 'src/provider/provider.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly adminService: AdminService,
    private readonly providerService: ProviderService,
    private jwtService: JwtService,
  ) {}

  async signInCustomer(email, password) {
    const user = await this.customerService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'User with email: ' + email + ' not found',
      );
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: 'customer',
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInAdmin(email, password) {
    const user = await this.adminService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'User with email: ' + email + ' not found',
      );
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: 'admin',
    };
    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
