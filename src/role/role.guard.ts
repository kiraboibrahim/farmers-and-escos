import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IsPublicMixin } from '@auth/auth.mixins';
import { Reflector } from '@nestjs/core';
import { Role } from './role.constants';
import { User } from '@auth/auth.types';
import {
  DISALLOWED_ROLES_KEY,
  PRIMARY_ROLES_KEY,
  SECONDARY_ROLES_KEY,
} from './roles.decorators';
import { applyMixins } from '@core/core.utils';

@Injectable()
export class RoleGuard implements CanActivate, IsPublicMixin {
  private readonly logger = new Logger(RoleGuard.name);

  constructor(private reflector: Reflector) {}

  isPublic: (reflector: Reflector, context: ExecutionContext) => boolean;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.isPublic(this.reflector, context);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const primaryRoles = this.getPrimaryRoles(context);
    if (!primaryRoles.size) {
      this.logger.warn(`Specify roles for route: ${request.url}`);
      return false;
    }
    const secondaryRoles = this.getSecondaryRoles(context);
    const disallowedRoles = this.getDisallowedRoles(context);
    const setDiff = function <T>(A: T[], B: T[]) {
      return A.filter(function (elem: T) {
        return B.indexOf(elem) < 0;
      });
    };
    const primaryAndSecondaryRoles = [...primaryRoles, ...secondaryRoles];
    const effectiveRoles = new Set(
      setDiff<Role>([...primaryAndSecondaryRoles], [...disallowedRoles]),
    );
    const userRole = (request.user as User).role;
    return effectiveRoles.has(Role.ANY) || effectiveRoles.has(userRole);
  }

  private getPrimaryRoles(context: ExecutionContext) {
    return new Set(
      this.reflector.getAllAndOverride<Role[]>(PRIMARY_ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [],
    );
  }

  private getSecondaryRoles(context: ExecutionContext) {
    return new Set(
      this.reflector.getAllAndOverride<Role[]>(SECONDARY_ROLES_KEY, [
        context.getHandler(),
      ]) || [],
    );
  }

  private getDisallowedRoles(context: ExecutionContext) {
    return new Set(
      this.reflector.getAllAndOverride<Role[]>(DISALLOWED_ROLES_KEY, [
        context.getHandler(),
      ]) || [],
    );
  }
}

applyMixins(RoleGuard, IsPublicMixin);
