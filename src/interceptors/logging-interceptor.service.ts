import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getIds, RequestExtension } from '../common/http-helpers';
import { FormatLoggerService } from '../services/format-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: FormatLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestExtension>();
    const id = getIds(request);
    const { params, query, body } = request;

    this.logger.logRequest(id, { params, query, body }, LoggingInterceptor);

    return next.handle().pipe(
      tap({
        next: (payload) => this.logger.logResponse(id, { payload }, LoggingInterceptor),
        // error: (error) => this.logger.logError(id, error, LoggingInterceptor),
      })
    );
  }
}
