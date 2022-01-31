import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { REQUEST_IDS, RequestExtension } from '../common/http-helpers';
import { RequestIdService } from '../services/request-id.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger, private readonly requestId: RequestIdService) {}

  use(request: RequestExtension, response: Response, next: NextFunction) {
    const inputTime = Date.now();
    const ids = this.requestId.generateIds();
    this.logger.log(formatRequest(request), ids.inputId);
    this.logger.log(request.headers, `${ids.inputId} (Request Headers)`);
    request[REQUEST_IDS] = ids;

    response.on('close', () => {
      this.logger.log(formatResponse(response, inputTime), ids.outputId);
    });

    next();
  }
}

function formatRequest({ method, originalUrl, socket }: RequestExtension): string {
  const address = socket.remoteAddress;
  const port = socket.remotePort;
  const [url] = originalUrl.split('?');
  return `${method} ${url} - ${address}:${port}`;
}

function formatResponse(response: Response, inputTime?: number): string {
  const timeDiff = inputTime ? `${Date.now() - inputTime}ms` : '';
  const { statusCode, statusMessage } = response;
  const contentLength = response.getHeader('content-length');
  const bytes = contentLength ? `, ${contentLength}bytes` : '';
  return `${statusCode} "${statusMessage}" - ${timeDiff}${bytes}`;
}
