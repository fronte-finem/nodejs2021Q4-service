import pino from 'pino';

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

export const logLevel: pino.Level =
  LogLevelEnvMap[LOG_LEVEL.toUpperCase() as LogLevelEnv] ?? LogLevelEnvMap.ALL;
