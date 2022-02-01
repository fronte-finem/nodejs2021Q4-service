import { Injectable, Logger } from '@nestjs/common';

type Constructor = new (...args: never[]) => unknown;

@Injectable()
export class FormatLoggerService {
  constructor(private readonly logger: Logger) {}

  logRequest(id: string, request: unknown, Context?: Constructor) {
    this.logger.log({ _: '▷▷▷ REQUEST ▷▷▷', REQUEST_ID: id, REQUEST: request }, Context?.name);
  }

  logResponse(id: string, response: unknown, Context?: Constructor) {
    this.logger.log({ _: '◁◁◁ RESPONSE ◁◁◁', REQUEST_ID: id, RESPONSE: response }, Context?.name);
  }

  logError(id: string, error: unknown, Context?: Constructor) {
    this.logger.error(
      { _: '❌❌❌ ERROR ❌❌❌', REQUEST_ID: id, ERROR: error, stack: undefined },
      null,
      Context?.name
    );
    const stack = (error as Error)?.stack;
    if (stack) {
      this.logger.debug(
        `\nREQUEST_ID: ${id}, Error Stack Trace:\n\n${(error as Error)?.stack}\n\n`,
        Context?.name
      );
    }
  }
}
