import { PrettyOptions } from 'pino-pretty';
import pinoPrettyCompact from '@mgcrea/pino-pretty-compact';
import { LogObject } from '@mgcrea/pino-pretty-compact/lib/prettifier';

export type Logger = (object: LogObject) => string;

export type Prettifier = (options?: PrettyOptions) => Logger;

/**
 * Replacing symbols "→", "←" in log message
 * @param msg - input log message
 * @returns fixed message
 */
const fixMessage = (msg: string) => msg.replace('→', '->').replace('←', '<-');

/**
 * This prettifier configuring pino-pretty-compact logger
 * @param options - pino-pretty config
 * @returns tuned {@link Logger}
 * @see https://github.com/pinojs/pino-pretty#options
 */
export const prettifier = (options: PrettyOptions = {}): Logger => {
  const logger: Logger = pinoPrettyCompact({
    ...options,
    ignore: 'pid,hostname,reqId,sessionId,plugin',
  });

  return ({ msg, ...rest }) => logger({ ...rest, msg: fixMessage(msg) });
};
