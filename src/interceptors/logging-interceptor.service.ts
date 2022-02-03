import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getRequestId, RequestExtension } from '../common/http-helpers';
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
    this.logger.httpRequest(id, { params, query, body });

    return next.handle().pipe(
      tap({
        next: (payload) => this.logger.httpResponse(id, { payload }),
        // error: (error) => this.logger.httpError(id, error),
      })
    );
  }
}
