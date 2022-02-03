import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { getRequestId, RequestExtension } from '../common/http-helpers';
import { mapAllErrors, mapPrismaErrors } from '../errors';
import { WinstonLogger } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly logger: WinstonLogger,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {
    logger.setContext(AllExceptionsFilter);
  }

  catch(error: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<RequestExtension>();
    const response = ctx.getResponse<Response>();
    const id = getRequestId(request);
    const isHttpException = error instanceof HttpException;
    if (!isHttpException) {
      this.logger.httpError(id, error);
    }
    const httpException = isHttpException ? error : mapAllErrors(mapPrismaErrors(error));
    const responseBody = httpException.getResponse();
    const statusCode = httpException.getStatus();
    this.logger.httpError(id, httpException);
    httpAdapter.reply(response, responseBody, statusCode);
  }
}
