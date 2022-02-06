import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  Scope,
} from '@nestjs/common';
import { Logger } from 'winston';
import { EnvConfig } from '../common/config';
import { Constructor } from '../common/types';
import { Title } from './logger.format';
import {
  WINSTON_LOGGER_PROVIDER,
  WinstonLogInput,
  WinstonLogLevel,
  WinstonLogOutput,
} from './logger.types';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLogger implements LoggerService {
  private context: string = '🔰';

  constructor(@Inject(WINSTON_LOGGER_PROVIDER) private readonly logger: Logger) {}

  setContext(context: string | Constructor) {
    this.context = typeof context === 'string' ? context : context.name;
  }

  log(input: WinstonLogInput, context: string = this.context): WinstonLogger {
    return this.$log('info', input, context);
  }

  error(input: WinstonLogInput | Error, context: string = this.context): WinstonLogger {
    return this.$log('error', input, context);
  }

  warn(input: WinstonLogInput, context: string = this.context): WinstonLogger {
    return this.$log('warn', input, context);
  }

  debug(input: WinstonLogInput, context: string = this.context): WinstonLogger {
    return this.$log('debug', input, context);
  }

  verbose(input: WinstonLogInput, context?: string): WinstonLogger {
    return this.$log('verbose', input, context);
  }

  private $log(
    level: WinstonLogLevel,
    input: WinstonLogInput,
    context: string = this.context
  ): WinstonLogger {
    const { message, meta } = WinstonLogger.handleInput(input);
    this.logger[level](message, { context, ...meta });
    return this;
  }

  private static handleInput(input: WinstonLogInput): WinstonLogOutput {
    if (typeof input === 'string') {
      return { message: input };
    }
    const { message, ...meta } = input;
    if (typeof message === 'string') return { message, meta };
    return { message: '', meta: { message, ...meta } };
  }

  httpRequest(requestId: number, request: unknown, context?: string) {
    this.log({ title: Title.HTTP_REQ, requestId, request }, context);
  }

  httpResponse(requestId: number, response: unknown, context?: string) {
    this.log({ title: Title.HTTP_RES, requestId, response }, context);
  }

  httpError(requestId: number, error: unknown, context?: string) {
    const stack = (error as Error)?.stack;
    delete (error as Error)?.stack;
    const isHttpException = error instanceof HttpException;
    if (isHttpException && error.getStatus() === HttpStatus.NOT_FOUND) {
      this.warn({ title: Title.HTTP_EXCEPTION_404, requestId, error }, context);
    } else {
      this.error(
        { title: isHttpException ? Title.HTTP_EXCEPTION : Title.ORIGINAL_ERROR, requestId, error },
        context
      );
    }
    if (EnvConfig.logLevel === 'verbose' && stack) {
      this.verbose({ title: Title.STACK_TRACE, message: stack, requestId }, context);
    }
  }
}
