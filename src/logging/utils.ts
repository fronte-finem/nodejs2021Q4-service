import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { STATUS_CODES } from 'http';
import { getErrorMessage } from '../common/get-error-message';
import { HttpStatusCode } from '../common/http-constants';
import { logger } from './logger';

export const uncaughtErrorHandler = (error: unknown, origin: unknown): void => {
  const prefix =
    origin instanceof Promise ? 'Unhandled Rejection' : 'Uncaught Exception';
  logger.fatal(`${prefix}: ${getErrorMessage(error)}\n\n ~ App exiting! ~`);
  process.exit(1);
};

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
  reply.status(statusCode).send(STATUS_CODES[statusCode]);
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
