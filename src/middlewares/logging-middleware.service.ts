import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { isEmpty } from '../common/utils/data-helpers';
import { REQUEST_ID, RequestExtension } from '../common/utils/http-helpers';
import { WinstonLogger } from '../logger/logger.service';
import { RequestIdService } from '../services/request-id.service';

type ObjectLike = Record<string, unknown>;

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: WinstonLogger,
    private readonly requestId: RequestIdService
  ) {
    logger.setContext(LoggingMiddleware);
  }

  use(request: RequestExtension, response: Response, next: NextFunction) {
    const inputTime = Date.now();
    const id = this.requestId.generateId();
    this.logger.httpRequest(id, LoggingMiddleware.formatRequest(request));
    request[REQUEST_ID] = id;

    response.on('finish', () => {
      this.logger.httpResponse(id, LoggingMiddleware.formatResponse(response, inputTime));
    });

    next();
  }

  static formatRequest({ method, originalUrl, socket, headers }: RequestExtension): ObjectLike {
    const address = socket.remoteAddress;
    const port = socket.remotePort;
    const [url] = originalUrl.split('?');
    return { method, url, from: `${address}:${port}`, headers };
  }

  static formatResponse(response: Response, inputTime?: number): ObjectLike {
    const responseTime = inputTime ? `${Date.now() - inputTime}ms` : '';
    const { statusCode, statusMessage } = response;
    const headers = response.getHeaders();
    const result: ObjectLike = { statusCode, statusMessage, responseTime };
    return isEmpty(headers) ? result : { ...result, headers };
  }
}
