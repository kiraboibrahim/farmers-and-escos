import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { IS_PUBLIC } from './auth.constants';

export class IsPublicMixin {
  isPublic(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);
  }
}
