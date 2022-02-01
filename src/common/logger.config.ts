import { LogLevel } from '@nestjs/common';
import { LoggerOptions, format, transports } from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const levels: Record<LogLevel | string, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};

export const loggerConfig: LoggerOptions = {
  levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.ms(),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'verbose',
      format: nestWinstonModuleUtilities.format.nestLike('App', { prettyPrint: true }),
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'all.log',
      level: 'verbose',
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
    }),
  ],
};
