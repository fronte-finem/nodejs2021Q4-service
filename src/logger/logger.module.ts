import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { createLogger, Logger, LoggerOptions } from 'winston';
import { WinstonLogger } from './logger.service';
import { WINSTON_LOGGER_PROVIDER, WINSTON_LOGGER_SERVICE_PROVIDER } from './logger.types';

@Global()
@Module({ providers: [WinstonLogger], exports: [WinstonLogger] })
export class LoggerModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: WINSTON_LOGGER_PROVIDER,
        useFactory: (): Logger => createLogger(options),
      },
      {
        provide: WINSTON_LOGGER_SERVICE_PROVIDER,
        useClass: WinstonLogger,
        inject: [WINSTON_LOGGER_PROVIDER],
      },
    ];

    return {
      module: LoggerModule,
      providers,
      exports: providers,
    };
  }
}
