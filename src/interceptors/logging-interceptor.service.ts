import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { isNotEmpty } from '../common/data-helpers';
import { getRequestId, RequestExtension } from '../common/http-helpers';
import { ObjectLike } from '../common/types';
import { WinstonLogger } from '../logger/logger.service';

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
    if (isNotEmpty(body)) meta.body = body;
    if (isNotEmpty(meta)) this.logger.httpRequest(id, meta);

    return next.handle().pipe(
      tap({
        next: (payload) => payload && this.logger.httpResponse(id, { payload }),
        // error: (error) => this.logger.httpError(id, error),
      })
    );
  }
}