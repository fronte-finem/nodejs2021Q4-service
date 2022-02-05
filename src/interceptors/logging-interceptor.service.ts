import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import fastRedact from 'fast-redact';
import { isNotEmpty } from '../common/utils/data-helpers';
import { getRequestId, RequestExtension } from '../common/utils/http-helpers';
import { ObjectLike } from '../common/types';
import { WinstonLogger } from '../logger/logger.service';

const redact = fastRedact({ paths: ['password'], serialize: false });

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLogger) {
    logger.setContext(LoggingInterceptor);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestExtension>();
    const id = getRequestId(request);
    const { params, query, body } = request;
    const meta: ObjectLike = {};
    if (isNotEmpty(params)) meta.params = params;
    if (isNotEmpty(query)) meta.query = query;
    if (isNotEmpty(body)) meta.body = redact({ ...body });
    if (isNotEmpty(meta)) this.logger.httpRequest(id, meta);

    return next.handle().pipe(
      tap({
        next: (payload) =>
          payload &&
          !(payload instanceof StreamableFile) &&
          this.logger.httpResponse(id, { payload }),
        // error: (error) => this.logger.httpError(id, error),
      })
    );
  }
}
