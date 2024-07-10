import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { applyMixins } from '@core/core.utils';
import { IsPublicMixin } from './auth.mixins';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IsPublicMixin {
  isPublic: (reflector: Reflector, context: ExecutionContext) => boolean;
  private _isPublic: boolean;

  constructor(private reflector: Reflector) {
    super();
  }

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this._isPublic = this.isPublic(this.reflector, context);
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, info: any) {
    // Don't raise authentication errors for public routes
    if (err && this._isPublic) {
      return undefined;
    }
    return user;
  }
}

applyMixins(JwtAuthGuard, IsPublicMixin);
