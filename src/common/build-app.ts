import buildFastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import { Maybe } from 'types/common';
import { Prettifier } from './logger';

/**
 * Build fastify instance with configured pretty-logger
 * @param options - Fastify options object
 * @param prettifier - pretty-logger configurator or falsy value
 * @returns fastify app instance
 */
export const buildApp = (
  options: FastifyServerOptions = {},
  prettifier: Maybe<Prettifier> | false = false
): FastifyInstance => {
  if (options.logger === false) {
    return buildFastify(options);
  }

  const logger = prettifier ? { prettyPrint: true, prettifier } : true;
  const disableRequestLogging = Boolean(prettifier);

  const app = buildFastify({ logger, disableRequestLogging, ...options });

  if (prettifier) {
    app.register(fastifyRequestLogger);
  }
  return app;
};
