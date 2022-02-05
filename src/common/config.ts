import { NestApplicationOptions } from '@nestjs/common';
import { WinstonLogLevel } from '../logger/logger.types';

export const nestAppConfig: NestApplicationOptions = {
  bufferLogs: true,
  bodyParser: true,
};

export const LOG_LEVELS: Record<WinstonLogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  verbose: 4,
};

const LOG_LEVEL = getEnvString('APP_LOG_LEVEL', 'verbose') as WinstonLogLevel;
const logLevel: WinstonLogLevel = LOG_LEVEL in LOG_LEVELS ? LOG_LEVEL : 'verbose';

export const EnvConfig = {
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV !== 'production',
  logLevel,
  useFastify: getEnvBoolean('APP_USE_FASTIFY'),
  host: getEnvString('APP_HOST', 'localhost'),
  port: getEnvNumber('APP_PORT', 3000),
  openApiRoute: getEnvString('OPEN_API_ROUTE', 'doc'),
  bcryptHashRounds: getEnvNumber('BCRYPT_HASH_ROUNDS', 10),
  jwtKey: getEnvString('APP_JWT_KEY', 'app_jwt_key'),
  uploadFormFieldName: getEnvString('UPLOAD_FORM_FIELD_NAME', 'filename'),
  uploadFileSizeLimit: getEnvNumber('UPLOAD_FILE_SIZE_LIMIT', 1024 * 1024 * 10),
  uploadDest: getEnvString('UPLOAD_DEST', 'uploads'),
};

function getEnvString(varName: string, defaultValue: string): string {
  return process.env[varName] ?? defaultValue;
}

function getEnvNumber(varName: string, defaultValue: number): number {
  const value = Number(process.env[varName]);
  return Number.isNaN(value) ? defaultValue : value;
}

function getEnvBoolean(varName: string): boolean {
  return /^true$/i.test(process.env[varName] ?? '');
}
