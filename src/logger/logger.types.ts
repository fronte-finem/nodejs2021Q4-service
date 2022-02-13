import { LogLevel } from '@nestjs/common';

export type WinstonLogLevel = Exclude<LogLevel, 'log'> | 'info';
export type WinstonLogInput = string | Record<string, unknown> | Error;
export type WinstonLogMeta = Record<string, unknown> | Omit<Error, 'message'>;
export type WinstonLogOutput = { message: string; meta?: WinstonLogMeta };

export const WINSTON_LOGGER_PROVIDER = Symbol('WINSTON_LOGGER_TOKEN');

export const LOG_LEVELS: Record<WinstonLogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};
