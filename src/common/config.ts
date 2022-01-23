import { FastifyInstance } from 'fastify/types/instance';
import { join } from 'path';
import { Level as LogLevelPino } from 'pino';

export const LOCALHOST = 'localhost';

export const appConfig: Parameters<FastifyInstance['listen']>[0] = {
  host: process.env.APP_HOST ?? LOCALHOST,
  port: Number(process.env.APP_PORT) || 5000,
};

const LogLevelEnvValues = <const>['ALL', 'INFO', 'WARN', 'ERROR'];
type LogLevelEnv = typeof LogLevelEnvValues[number];

const LogLevelMapEnv2Pino: Readonly<Record<LogLevelEnv, LogLevelPino>> =
  Object.freeze({
    ALL: 'trace',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  });

const maybeLogLevelEnv = process.env.APP_LOG_LEVEL?.toUpperCase();
const maybeLogLevelPino = LogLevelMapEnv2Pino[maybeLogLevelEnv as LogLevelEnv];
export const LOG_LEVEL: LogLevelPino =
  maybeLogLevelPino ?? LogLevelMapEnv2Pino.ALL;

const LOGS_DIR = 'logs';
export const LOG_FILE_ALL = join('.', LOGS_DIR, 'all.log');
export const LOG_FILE_ERROR = join('.', LOGS_DIR, 'error.log');

export const SALT_ROUNDS = Number(process.env.APP_SALT_ROUNDS) || 10;

export const APP_JWT_KEY = process.env.APP_JWT_KEY || 'APP_JWT_KEY';
