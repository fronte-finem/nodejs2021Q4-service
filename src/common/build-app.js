import buildFastify from 'fastify';
import pinoPrettyCompact from '@mgcrea/pino-pretty-compact';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import { NODE_ENV } from './config.js';

export const buildApp = (options) => {
  const isProd = NODE_ENV === 'production';
  const isDev = !isProd;

  const prettifier = (loggerOptions) => {
    const logger = pinoPrettyCompact.default({
      ...loggerOptions,
      ignore: 'pid,hostname,reqId,sessionId,plugin',
    });
    return ({ msg, ...logChunks }) => {
      const fixed = msg.replace('→', '->').replace('←', '<-');
      return logger({ msg: fixed, ...logChunks });
    };
  };

  const logger = isDev ? { prettyPrint: true, prettifier } : true;

  const app = buildFastify({
    logger,
    disableRequestLogging: isDev,
    ...options,
  });

  if (isDev) {
    app.register(fastifyRequestLogger);
  }

  return app;
};
