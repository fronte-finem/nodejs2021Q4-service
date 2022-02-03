import { NestApplicationOptions } from '@nestjs/common';

export const LOCALHOST = 'localhost';

const isProd = process.env.NODE_ENV === 'production';

export const nestServerConfig = {
  isProd,
  isDev: !isProd,
  logLevel: process.env.APP_LOG_LEVEL ?? 'all',
  host: process.env.APP_HOST ?? LOCALHOST,
  port: Number(process.env.APP_PORT) || 3000,
  isFastify: process.env.APP_IS_FASTIFY === String(true),
  openApiRoute: process.env.OPEN_API_ROUTE ?? 'doc',
};

export const nestAppConfig: NestApplicationOptions = {
  bufferLogs: true,
  bodyParser: true,
};
