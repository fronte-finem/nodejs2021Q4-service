import { Catch, ArgumentsHost, ExceptionFilter, Logger, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { getIds, RequestExtension } from '../common/http-helpers';
import { mapAllErrors, mapPrismaErrors } from '../errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly logger: Logger) {}

  catch(error: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<RequestExtension>();
    const { errorId } = getIds(request);
    const isHttpException = error instanceof HttpException;
    if (!isHttpException) {
      this.logger.error({ error }, errorId);
      this.logger.error(error, errorId);
    }
    const httpException = isHttpException ? error : mapAllErrors(mapPrismaErrors(error));
    const responseBody = httpException.getResponse();
    const statusCode = httpException.getStatus();
    this.logger.error(httpException, errorId);
    this.logger.error(responseBody, errorId);
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
