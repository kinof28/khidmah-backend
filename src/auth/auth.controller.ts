import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, loginSchema } from './dto/login.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer')
  @UsePipes(new ZodValidationPipe(loginSchema))
  customerLogin(@Body() customerLoginDto: LoginDto) {
    return this.authService.signInCustomer(
      customerLoginDto.email,
      customerLoginDto.password,
    );
  }
}
