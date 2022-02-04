import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { throwExpression } from '../../errors';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(login, password);
    return user ?? throwExpression(new ForbiddenException('Incorrect login or password!'));
  }
}
