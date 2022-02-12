import { ClassProvider, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfigService } from './env.config.service';
import { validateEnvVars } from './env.validation';

const configServiceProvider: ClassProvider = {
  provide: ConfigService,
  useClass: EnvConfigService,
};

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      validate: validateEnvVars,
    }),
  ],
  providers: [configServiceProvider, EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
