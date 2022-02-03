import { Inject, Injectable, LoggerService, LogLevel, Scope } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_LOGGER_PROVIDER } from './logger.constants';

type WinstonLogLevel = Exclude<LogLevel, 'log'> | 'info';
type WinstonLogInput = string | Record<string, unknown> | Error;
type WinstonLogMeta = Record<string, unknown> | Omit<Error, 'message'>;
type WinstonLogOutput = { message: string; meta?: WinstonLogMeta };

type Constructor = new (...args: never[]) => unknown;

const REPEAT_FRAGMENT = 20;

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
    this.log({ message: WinstonLogger.HTTP_REQ, requestId, request }, context);
  }

  httpResponse(requestId: number, response: unknown, context?: string) {
    this.log({ message: WinstonLogger.HTTP_RES, requestId, response }, context);
  }

  httpError(requestId: number, error: unknown, context?: string) {
    const stack = (error as Error)?.stack;
    delete (error as Error)?.stack;
    this.error({ message: '', requestId, error }, context);
    if (stack) {
      this.verbose({ message: `ERROR STACK TRACE\n\n${stack}`, requestId }, context);
    }
  }

  static readonly HTTP_REQ = '▶▷▶ '.repeat(REPEAT_FRAGMENT);
  static readonly HTTP_RES = '◀◁◀ '.repeat(REPEAT_FRAGMENT);
}
