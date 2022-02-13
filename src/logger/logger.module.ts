import { Global, Module } from '@nestjs/common';
import { createLogger, Logger } from 'winston';
import { EnvConfigService } from '../config/env.config.service';
import { loggerOptionsFactory } from './logger.config';
import { WinstonLogger } from './logger.service';
import { WINSTON_LOGGER_PROVIDER } from './logger.types';

@Global()
@Module({
  providers: [
    {
      inject: [EnvConfigService],
      provide: WINSTON_LOGGER_PROVIDER,
      useFactory: (configService: EnvConfigService): Logger =>
        createLogger(loggerOptionsFactory(configService)),
    },
    WinstonLogger,
  ],
  exports: [WinstonLogger],
})
export class LoggerModule {}
