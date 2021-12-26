import { FastifyLoggerInstance } from 'fastify';
import pino from 'pino';
import { logLevel } from '../common/config';

const commonPrettyOpts = {
  colorize: false,
  ignore: 'pid,hostname',
  translateTime: 'yyyy-mm-dd HH:MM:ss.l',
};

export const logger: FastifyLoggerInstance = pino({
  level: logLevel,
  transport: {
    targets: [
      {
        level: 'trace',
        target: 'pino-pretty',
        options: {
          ...commonPrettyOpts,
          colorize: true,
        },
      },
      {
        level: 'trace',
        target: 'pino-pretty',
        options: {
          destination: './logs/all.log',
          mkdir: true,
          ...commonPrettyOpts,
        },
      },
      {
        level: 'error',
        target: 'pino-pretty',
        options: {
          destination: './logs/error.log',
          mkdir: true,
          ...commonPrettyOpts,
        },
      },
    ],
  },
}) as unknown as FastifyLoggerInstance;
