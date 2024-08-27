import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@role/role.constants';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { AllowOnly } from '@role/roles.decorators';
import { PermissionGuard } from '../permission/permission.guard';
import { RoleGuard } from '@role/role.guard';
import { IS_PUBLIC } from '@auth/auth.constants';
import { IPAddressGuard } from '@auth/ip.guard';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    ApiBearerAuth(),
    AllowOnly(...roles),
    UseGuards(JwtAuthGuard, RoleGuard, PermissionGuard),
  );
};

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const IsPublic = () => {
  return SetMetadata(IS_PUBLIC, true);
};

export const AllowIPAddress = (IPAddress: string) => {
  return UseGuards(new IPAddressGuard(IPAddress));
};

export const AllowLocalhost = () => {
  return AllowIPAddress('127.0.0.1');
};
