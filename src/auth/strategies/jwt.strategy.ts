import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../../common/config';
import { TokenDto } from '../dto/token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: EnvConfig.jwtKey,
    });
  }

  async validate(tokenDto: TokenDto): Promise<TokenDto> {
    return tokenDto;
  }
}
