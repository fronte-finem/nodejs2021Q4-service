import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validation';

@Injectable()
export class EnvConfigService extends ConfigService<EnvironmentVariables, true> {
  get<P extends keyof EnvironmentVariables>(property: P) {
    return super.get(property, { infer: true });
  }
}
