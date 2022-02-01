import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { REQUEST_IDS, RequestExtension } from '../common/http-helpers';
import { FormatLoggerService } from '../services/format-logger.service';
import { RequestIdService } from '../services/request-id.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: FormatLoggerService,
    private readonly requestId: RequestIdService
  ) {}

  use(request: RequestExtension, response: Response, next: NextFunction) {
    const inputTime = Date.now();
    const id = this.requestId.generateId();
    this.logger.logRequest(id, formatRequest(request), LoggingMiddleware);
    request[REQUEST_IDS] = id;

    response.on('finish', () => {
      this.logger.logResponse(id, formatResponse(response, inputTime), LoggingMiddleware);
    });

    next();
  }
}

function formatRequest({
  method,
  originalUrl,
  socket,
  headers,
}: RequestExtension): Record<string, unknown> {
  const address = socket.remoteAddress;
  const port = socket.remotePort;
  const [url] = originalUrl.split('?');
  return {
    method,
    url,
    from: `${address}:${port}`,
    headers,
  };
}

function formatResponse(response: Response, inputTime?: number): Record<string, unknown> {
  const timeDiff = inputTime ? `${Date.now() - inputTime}ms` : '';
  const { statusCode, statusMessage } = response;
  const contentLength = response.getHeader('content-length');
  return { statusCode, statusMessage, contentLength, responseTime: timeDiff };
}
