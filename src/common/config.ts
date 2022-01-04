import { resolve, join } from 'path';
import { mkdirSync } from 'fs';
import pino from 'pino';
import { getErrorMessage } from './get-error-message';

const LogLevelEnvValues = <const>['ALL', 'INFO', 'WARN', 'ERROR'];
type LogLevelEnv = typeof LogLevelEnvValues[number];

const LogLevelEnvMap: Readonly<Record<LogLevelEnv, pino.Level>> = {
  ALL: 'trace',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

export const {
  LOG_LEVEL = LogLevelEnvValues[0],
  PORT = String(5000),
  NODE_ENV = 'development',
  MONGO_CONNECTION_STRING = 'mongo connection string',
  JWT_SECRET_KEY = 'JWT secret key',
  AUTH_MODE = String(false),
} = process.env;

export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;
export const IS_AUTH_MODE = AUTH_MODE === String(true);

const LOG_DIR = resolve(process.env.LOG_DIR ?? './logs');

try {
  mkdirSync(LOG_DIR, { recursive: true });
} catch (error) {
  console.error(
    `Can't create directory for logs with env LOG_DIR = "${process.env.LOG_DIR}"`
  );
  console.error(getErrorMessage(error));
  process.exit(1);
}

export const LOG_FILE_ALL = join(LOG_DIR, 'all.log');
export const LOG_FILE_ERROR = join(LOG_DIR, 'error.log');

export const logLevel: pino.Level =
  LogLevelEnvMap[LOG_LEVEL.toUpperCase() as LogLevelEnv] ?? LogLevelEnvMap.ALL;
