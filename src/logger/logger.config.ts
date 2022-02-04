import { LoggerOptions, format, transports } from 'winston';
import { EnvConfig } from '../common/config';
import { getConsoleFormat } from './logger.format';
import { WinstonLogLevel } from './logger.types';

const { logLevel, isProd } = EnvConfig;

const LOG_LEVELS: Record<WinstonLogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};

const LOG_LEVEL: WinstonLogLevel =
  logLevel in LOG_LEVELS ? (logLevel as WinstonLogLevel) : 'verbose';

export const loggerConfig: LoggerOptions = {
  level: LOG_LEVEL,
  levels: LOG_LEVELS,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.ms(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: isProd ? undefined : getConsoleFormat('App', { prettyPrint: true }),
    }),
    // new transports.File({
    //   dirname: 'logs',
    //   filename: 'all.log',
    // }),
    // new transports.File({
    //   dirname: 'logs',
    //   filename: 'error.log',
    //   level: 'error',
    // }),
  ],
};
