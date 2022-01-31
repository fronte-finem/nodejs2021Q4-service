import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getIds, RequestExtension } from '../common/http-helpers';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestExtension>();
    const { inputId, outputId } = getIds(request);
    this.logger.log(request.params, `${inputId} (Request Params)`);
    this.logger.log(request.query, `${inputId} (Request Query)`);
    if (request.body) {
      this.logger.log(request.body, `${inputId} (Request Body)`);
    }

    return next.handle().pipe(
      tap((payload) => {
        if (payload) {
          this.logger.log(payload, `${outputId} (Response Payload)`);
        }
      })
    );
  }
}
