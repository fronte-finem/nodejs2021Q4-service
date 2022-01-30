import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const MAX_ID_LENGTH = 10;
const MAX_ID = Number(''.padEnd(MAX_ID_LENGTH, '9'));

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private _reqId = 0;

  private getReqId(): string {
    const id = `${this._reqId}`.padStart(MAX_ID_LENGTH, '·');
    this._reqId += 1;
    if (this._reqId > MAX_ID) {
      this._reqId = 0;
    }
    return id;
  }

  constructor(private readonly logger: Logger) {}

  use(request: Request, response: Response, next: NextFunction) {
    const inputTime = Date.now();
    const reqId = this.getReqId();
    const inId = `${reqId} -> `;
    const outId = `${reqId} <- `;
    const { method, originalUrl: url, headers, body } = request;
    const address = request.socket.remoteAddress;
    const port = request.socket.remotePort;
    const input = `${method} ${url} - ${address}:${port}`;
    this.logger.log(input, inId);
    this.logger.log(`Headers:\n${JSON.stringify(headers, null, 2)}`, inId);
    this.logger.log(`Body:\n${JSON.stringify(body, null, 2)}`, inId);

    // request.on('data', (chunk) => {
    //   console.log('Received body data:');
    //   console.log(chunk.toString());
    // });

    response.on('close', () => {
      const timeDiff = `${Date.now() - inputTime}ms`;
      const { statusCode, statusMessage } = response;
      const contentLength = response.getHeader('content-length');
      const bytes = contentLength ? `, ${contentLength}bytes` : '';
      const output = `${statusCode} "${statusMessage}" - ${timeDiff}${bytes}`;
      this.logger.log(output, outId);
    });

    next();
  }
}
