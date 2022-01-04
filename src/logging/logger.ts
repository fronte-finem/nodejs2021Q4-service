import { FastifyRequest } from 'fastify';
import { Logger, pino } from 'pino';
import { logLevel } from '../common/config';

export const logger: Logger = pino({
  level: logLevel,
  transport: {
    targets: [
      {
        level: 'trace',
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname',
          translateTime: 'yyyy-mm-dd HH:MM:ss.l',
        },
      },
      {
        level: 'trace',
        target: 'pino/file',
        options: {
          destination: './logs/all.log',
          mkdir: true,
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: './logs/error.log',
          mkdir: true,
        },
      },
    ],
  },
  serializers: {
    req(request: FastifyRequest) {
      return {
        method: request.method,
        hostname: request.hostname,
        url: request.url,
        queries: handleEmpty(request.query as Record<string, string>),
        params: handleEmpty(request.params as Record<string, string>),
        remoteAddress: request.ip,
        remotePort: request.socket.remotePort,
      };
    },
  },
});

function handleEmpty(
  record: Record<string, string>
): Record<string, string> | undefined {
  if (Object.keys(record).length) return record;
  return undefined;
}
