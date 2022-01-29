import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { mapAllErrors, mapPrismaErrors, UseErrorMapper } from '../errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  @UseErrorMapper(mapPrismaErrors)
  @UseErrorMapper(mapAllErrors)
  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const responseBody = exception.getResponse();
    const statusCode = exception.getStatus();
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
