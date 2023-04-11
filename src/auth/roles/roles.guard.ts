import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get('role', context.getHandler());
    console.log('roli te rolesguard', roles);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // user should now be defined
    console.log(user);

    return user && user.role && user.role.includes(roles);
  }
}
