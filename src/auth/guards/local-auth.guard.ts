import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ObjectLike } from '../../common/types';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = ObjectLike>(err: unknown, user: TUser): TUser {
    if (err || !user) {
      throw err || new ForbiddenException('Incorrect login or password!');
    }
    return user;
  }
}
