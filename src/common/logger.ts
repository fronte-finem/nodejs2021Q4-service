import pinoPrettyCompact from '@mgcrea/pino-pretty-compact';
import { LogObject } from '@mgcrea/pino-pretty-compact/lib/prettifier';
import { PrettyOptions } from 'pino-pretty';

export type Logger = (object: LogObject) => string;

export type Prettifier = (options?: PrettyOptions) => Logger;

const defaultPrettifier: Prettifier =
  typeof pinoPrettyCompact === 'function'
    ? pinoPrettyCompact
    : (pinoPrettyCompact as unknown as { default: Prettifier }).default;

/**
 * Replacing symbols "→", "←" in log message
 * @param msg - input log message
 * @returns fixed message
 */
const fixMessage = (msg: string) => msg.replace('→', '->').replace('←', '<-');

/**
 * Configuring pino-pretty-compact logger
 * @param options - pino-pretty config
 * @returns configured {@link Logger}
 * @see https://github.com/pinojs/pino-pretty#options
 */
export const prettifier = (options: PrettyOptions = {}): Logger => {
  const logger: Logger = defaultPrettifier({
    ...options,
    ignore: 'pid,hostname,reqId,sessionId,plugin',
  });

  return ({ msg, ...rest }) => logger({ ...rest, msg: fixMessage(msg) });
};
