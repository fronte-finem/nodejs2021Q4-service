import { format, LoggerOptions, transports, transport as Transport } from 'winston';
import { EnvConfig, LOG_LEVELS } from '../common/config';
import { getConsoleFormat } from './logger.format';

const transportsArray: Transport[] = [
  new transports.File({ dirname: 'logs', filename: 'all.log' }),
  new transports.File({ dirname: 'logs', filename: 'error.log', level: 'error' }),
];

if (EnvConfig.isDev) {
  const consoleFormat = getConsoleFormat('App', { prettyPrint: true });
  transportsArray.push(new transports.Console({ format: consoleFormat }));
}

export const loggerConfig: LoggerOptions = {
  level: EnvConfig.logLevel,
  levels: LOG_LEVELS,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.ms(),
    format.json()
  ),
  transports: transportsArray,
};
