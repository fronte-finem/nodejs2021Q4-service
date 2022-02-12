import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { envVars } from '../../config/env.validation';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envVars.JWT_KEY,
    });
  }

  async validate(tokenDto: TokenDto): Promise<TokenDto> {
    return tokenDto;
  }
}
