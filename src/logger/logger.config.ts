import { format, LoggerOptions, transports, transport as Transport } from 'winston';
import { envVars } from '../config/env.validation';
import { getConsoleFormat } from './logger.format';
import { LOG_LEVELS } from './logger.types';

const transportsArray: Transport[] = [
  new transports.File({ dirname: 'logs', filename: 'all.log' }),
  new transports.File({ dirname: 'logs', filename: 'error.log', level: 'error' }),
];

if (envVars.isDev) {
  const consoleFormat = getConsoleFormat('App', { prettyPrint: true });
  transportsArray.push(new transports.Console({ format: consoleFormat }));
}

export const loggerConfig: LoggerOptions = {
  level: envVars.LOG_LEVEL,
  levels: LOG_LEVELS,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.ms(),
    format.json()
  ),
  transports: transportsArray,
};
