import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { getIds, RequestExtension } from '../common/http-helpers';
import { mapAllErrors, mapPrismaErrors } from '../errors';
import { FormatLoggerService } from '../services/format-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: FormatLoggerService,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  catch(error: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<RequestExtension>();
    const id = getIds(request);
    const isHttpException = error instanceof HttpException;
    if (!isHttpException) {
      this.logger.logError(id, error, AllExceptionsFilter);
    }
    const httpException = isHttpException ? error : mapAllErrors(mapPrismaErrors(error));
    const responseBody = httpException.getResponse();
    const statusCode = httpException.getStatus();
    this.logger.logError(id, httpException, AllExceptionsFilter);
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
