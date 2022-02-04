import { HttpException, Inject, Injectable, LoggerService, Scope } from '@nestjs/common';
import chalk from 'chalk';
import { Logger } from 'winston';
import { Constructor } from '../common/types';
import {
  WINSTON_LOGGER_PROVIDER,
  WinstonLogInput,
  WinstonLogLevel,
  WinstonLogOutput,
} from './logger.types';

const HTTP_PREFIX = chalk.bgGreen.greenBright('  HTTP  ');
const HTTP_REQ = `${HTTP_PREFIX}${chalk.bgCyan.blue(' ▶ ▶ ▶ REQUEST ▶ ▶ ▶ ')}`;
const HTTP_RES = `${HTTP_PREFIX}${chalk.bgBlue.cyan(' ◀ ◀ ◀ RESPONSE ◀ ◀ ◀ ')}`;
const errorTitle = (title: string) => chalk.bgRed.redBright(`  ${title}  `);

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
    this.log({ title: HTTP_REQ, requestId, request }, context);
  }

  httpResponse(requestId: number, response: unknown, context?: string) {
    this.log({ title: HTTP_RES, requestId, response }, context);
  }

  httpError(requestId: number, error: unknown, context?: string) {
    const stack = (error as Error)?.stack;
    delete (error as Error)?.stack;
    const title = errorTitle(error instanceof HttpException ? 'HTTP EXCEPTION' : 'ORIGINAL ERROR');
    this.error({ title, requestId, error }, context);
    if (stack) {
      this.verbose({ title: errorTitle('ERROR STACK TRACE'), message: stack, requestId }, context);
    }
  }
}
