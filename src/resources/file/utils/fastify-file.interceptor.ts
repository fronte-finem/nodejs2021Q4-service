import { CallHandler, ExecutionContext, mixin, NestInterceptor, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Multer, Options as MulterOptions } from 'multer';
import FastifyMulterFactory from 'fastify-multer';
import { Options } from 'fastify-multer/lib/interfaces';

export function FastifyFileInterceptor(
  fieldName: string,
  options: MulterOptions
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: Multer;

    constructor() {
      this.multer = FastifyMulterFactory(options as Options) as unknown as Multer;
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) => {
        this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (error: unknown) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
