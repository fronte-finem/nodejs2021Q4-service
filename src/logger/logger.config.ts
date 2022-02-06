import { format, LoggerOptions, transports } from 'winston';
import { EnvConfig, LOG_LEVELS } from '../common/config';
import { getConsoleFormat } from './logger.format';

const { logLevel, isProd } = EnvConfig;

export const loggerConfig: LoggerOptions = {
  level: logLevel,
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
    new transports.File({
      dirname: 'logs',
      filename: 'all.log',
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
    }),
  ],
};
