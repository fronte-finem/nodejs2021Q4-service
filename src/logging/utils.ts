import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { STATUS_CODES } from 'http';
import { getErrorMessage } from '../common/get-error-message';
import { HttpStatusCode } from '../common/http-constants';
import { logger } from './logger';

export class FatalHandler {
  private static readonly build =
    (prefix: string) =>
    (error: unknown): string =>
      `${prefix}: ${getErrorMessage(error)}\n\n ~ App exiting! ~`;

  private static readonly uncaught = FatalHandler.build('Uncaught Exception');
  private static readonly unhandled = FatalHandler.build('Unhandled Rejection');

  public static readonly uncaughtException = (exception: unknown): void => {
    logger.fatal(FatalHandler.uncaught(exception));
    process.exit(1);
  };

  public static readonly unhandledRejection = (rejection: unknown): void => {
    logger.fatal(FatalHandler.unhandled(rejection));
    setImmediate(() => process.exit(1));
  };
}

export const fastifyErrorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): void => {
  const statusCode =
    error.statusCode ??
    (error.validation
      ? HttpStatusCode.BAD_REQUEST
      : HttpStatusCode.INTERNAL_SERVER_ERROR);
  const errorType = error.name ?? (error.validation ? 'Validation Error' : '');
  logger.error(`${errorType}: ${getErrorMessage(error)}`);
  if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
    reply.status(statusCode).send(STATUS_CODES[statusCode]);
  } else {
    reply.status(statusCode).send(error);
  }
};

export const logRequestBody = async (
  request: FastifyRequest
): Promise<void> => {
  if (!request.body) return;
  request.log.debug({ body: request.body }, '-> Request Body');
};

export const logResponseBody = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown
): Promise<unknown> => {
  request.log.debug({ body: payload }, '<- Response Body');
  return payload;
};
