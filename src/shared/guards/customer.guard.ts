import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.payload.role === 'customer';
  }
}
