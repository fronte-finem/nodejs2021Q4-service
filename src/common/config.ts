import { resolve, join } from 'path';
import { mkdirSync } from 'fs';
import pino from 'pino';
import { getErrorMessage } from './get-error-message';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

const LogLevelEnvValues = <const>['ALL', 'INFO', 'WARN', 'ERROR'];
type LogLevelEnv = typeof LogLevelEnvValues[number];

const LogLevelEnvMap: Readonly<Record<LogLevelEnv, pino.Level>> = {
  ALL: 'trace',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
};

const logLevel = process.env.LOG_LEVEL?.toUpperCase() ?? LogLevelEnvValues[0];
const maybePinoLevel = LogLevelEnvMap[logLevel as LogLevelEnv];
export const LOG_LEVEL: pino.Level = maybePinoLevel ?? LogLevelEnvMap.ALL;

export const PORT = Number(process.env.PORT) || 5000;

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
