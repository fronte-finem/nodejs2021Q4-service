import chalk, { Chalk } from 'chalk';
import { configure as createStringify } from 'safe-stable-stringify';
import { inspect } from 'util';
import { format, Logform } from 'winston';
import { isEmpty } from '../common/utils/data-helpers';
import { ObjectLike } from '../common/types';
import { WinstonLogLevel } from './logger.types';

const ColorScheme: Record<WinstonLogLevel, Chalk> = {
  error: chalk.red,
  warn: chalk.rgb(255, 127, 0),
  info: chalk.green,
  debug: chalk.blueBright,
  verbose: chalk.gray,
};

interface ConsoleFormatOptions {
  prettyPrint?: boolean;
}

export function getConsoleFormat(
  appName = 'App',
  options: ConsoleFormatOptions = {}
): Logform.Format {
  return format.printf(({ level, message, context, title, timestamp, ms, requestId, ...meta }) => {
    const colorize = ColorScheme[level as WinstonLogLevel] ?? ColorScheme.verbose;

    const formattedContext = colorize(`  [${appName}::${context}]`);
    const formattedLevel = colorize.inverse(`  ${level.toUpperCase()}  `);
    const formattedMs = ms ?? '';
    let formattedTime = timestamp ? `${timestamp} ${formattedMs}` : formattedMs;
    formattedTime = colorize(formattedTime ? `  ${formattedTime}  ` : '  ');
    const formattedId =
      requestId !== undefined ? colorize.inverse(` Request ID: ${requestId} `) : '';
    const underlined = chalk.underline(`${formattedContext}${formattedTime}`);
    const firstLine = `${formattedLevel}${underlined}${formattedId}`;
    const formattedTitle = title ? `${title}\n` : '';
    const formattedMessage = message ? `${message}\n` : '';
    const formattedMeta = formatMeta(meta as ObjectLike, options);

    return `${firstLine}\n${formattedTitle}${formattedMessage}${formattedMeta}\n`;
  });
}

const stringify = createStringify({ circularValue: undefined });

function formatMeta(meta?: ObjectLike, { prettyPrint = false }: ConsoleFormatOptions = {}): string {
  if (!meta) return '';
  const formattedMeta = { ...meta };
  delete formattedMeta[Symbol.for('level')];
  delete formattedMeta[Symbol.for('splat')];
  delete formattedMeta[Symbol.for('message')];
  if (formattedMeta.target === undefined) delete formattedMeta.target;
  if (isEmpty(formattedMeta)) return '';
  return prettyPrint
    ? inspect(formattedMeta, { colors: true, depth: null })
    : stringify(formattedMeta);
}
