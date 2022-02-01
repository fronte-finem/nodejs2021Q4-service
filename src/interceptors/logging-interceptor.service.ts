import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { isNotEmpty } from '../common/data-helpers';
import { getIds, RequestExtension } from '../common/http-helpers';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<RequestExtension>();
    const { inputId, outputId } = getIds(request);
    const { params, query, body } = request;

    this.log(params, inputId, 'Request Params');
    this.log(query, inputId, 'Request Query');
    this.log(body, inputId, 'Request Body');

    return next.handle().pipe(tap((payload) => this.log(payload, outputId, 'Response Payload')));
  }

  private log(data: unknown, id: string, postfix: string) {
    if (isNotEmpty(data)) {
      this.logger.log(data, `${id} (${postfix})`);
    }
  }
}
