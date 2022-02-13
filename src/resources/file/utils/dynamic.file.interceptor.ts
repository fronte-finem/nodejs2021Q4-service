import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { EnvConfigService } from '../../../config/env.config.service';
import { FileInterceptorFactory } from './file.Interceptor.factory';

@Injectable()
export class DynamicFileInterceptor implements NestInterceptor {
  private _interceptor: NestInterceptor;

  constructor(private readonly configService: EnvConfigService) {
    const FileInterceptorClass = FileInterceptorFactory(configService);
    this._interceptor = new FileInterceptorClass();
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return this._interceptor.intercept(context, next);
  }
}
