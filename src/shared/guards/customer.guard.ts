import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Todo: remove console.log
    // console.log('request.user: ', request.payload);
    return request.payload.role === 'customer';
  }
}
