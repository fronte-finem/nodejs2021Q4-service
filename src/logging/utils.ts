import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { STATUS_CODES } from 'http';
import { HttpStatusCode } from '../common/http-constants';
import { logger } from './logger';

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  switch (typeof error) {
    case 'string':
      return error;
    case 'object':
      return JSON.stringify(error);
    default:
      return String(error);
  }
}

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
  if (request.body) {
    const body = JSON.stringify(request.body, null, 2);
    logger.info(`parsed request body:\n${body}`);
  }
};
