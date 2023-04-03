import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get('role', context.getHandler());

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return roles.indexOf(user.role) > -1;
  }
}
