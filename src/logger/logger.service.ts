import { Inject, Injectable, LoggerService, LogLevel, Scope } from '@nestjs/common';
import chalk from 'chalk';
import { Logger } from 'winston';
import { WINSTON_LOGGER_PROVIDER } from './logger.constants';

type WinstonLogLevel = Exclude<LogLevel, 'log'> | 'info';
type WinstonLogInput = string | Record<string, unknown> | Error;
type WinstonLogMeta = Record<string, unknown> | Omit<Error, 'message'>;
type WinstonLogOutput = { message: string; meta?: WinstonLogMeta };

type Constructor = new (...args: never[]) => unknown;

const HTTP_PREFIX = chalk.bgGreen.whiteBright('  HTTP  ');
const HTTP_REQ = `${HTTP_PREFIX}${chalk.bgCyan.blue(' ▶ ▶ ▶ REQUEST ▶ ▶ ▶ ')}`;
const HTTP_RES = `${HTTP_PREFIX}${chalk.bgBlue.cyan(' ◀ ◀ ◀ RESPONSE ◀ ◀ ◀ ')}`;

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
    this.log({ message: HTTP_REQ, requestId, request }, context);
  }

  httpResponse(requestId: number, response: unknown, context?: string) {
    this.log({ message: HTTP_RES, requestId, response }, context);
  }

  httpError(requestId: number, error: unknown, context?: string) {
    const stack = (error as Error)?.stack;
    delete (error as Error)?.stack;
    this.error({ message: '', requestId, error }, context);
    if (stack) {
      this.verbose({ message: `ERROR STACK TRACE\n\n${stack}`, requestId }, context);
    }
  }
}
