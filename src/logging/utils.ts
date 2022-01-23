import { FastifyReply, FastifyRequest, onErrorHookHandler } from 'fastify';
import { getErrorMessage } from '../common/get-error-message';
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

export const logFastifyError: onErrorHookHandler = async (
  request,
  reply,
  error
): Promise<void> => {
  const shortError = error;
  delete shortError.stack;
  logger.error(shortError);
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
