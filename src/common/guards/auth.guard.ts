import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private ref: Reflector) {
    super();
  }
  canActivate(cxt: ExecutionContext) {
    const isPublic = this.ref.getAllAndOverride('isPublic', [
      cxt.getHandler(),
      cxt.getClass(),
    ]);
    if (isPublic) return true;
    return super.canActivate(cxt);
  }
}
