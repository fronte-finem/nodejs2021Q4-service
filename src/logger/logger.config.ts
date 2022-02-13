import { format, LoggerOptions, transports, transport as Transport } from 'winston';
import { EnvConfigService } from '../config/env.config.service';
import { getConsoleFormat } from './logger.format';
import { LOG_LEVELS } from './logger.types';

export const loggerOptionsFactory = (configService: EnvConfigService): LoggerOptions => {
  const transportsArray: Transport[] = [
    new transports.File({ dirname: 'logs', filename: 'all.log' }),
    new transports.File({ dirname: 'logs', filename: 'error.log', level: 'error' }),
  ];

  if (configService.get('isDev')) {
    const consoleFormat = getConsoleFormat('App', { prettyPrint: true });
    transportsArray.push(new transports.Console({ format: consoleFormat }));
  }

  return {
    level: configService.get('LOG_LEVEL'),
    levels: LOG_LEVELS,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      format.ms(),
      format.json()
    ),
    transports: transportsArray,
  };
};
