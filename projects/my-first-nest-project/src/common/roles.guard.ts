import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (matchRoles(roles, user.roles)) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
function matchRoles(roles: string[], user_roles: string[]): boolean {
  return user_roles.some((r) => roles.indexOf(r) >= 0);
}
