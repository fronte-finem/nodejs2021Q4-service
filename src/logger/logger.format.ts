import { LogLevel } from '@nestjs/common';
import { inspect } from 'util';
import { Logform, format } from 'winston';
import chalk, { Chalk } from 'chalk';
import { configure as createStringify } from 'safe-stable-stringify';
import { isEmpty } from '../common/data-helpers';
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
  return format.printf(({ level, message, context, timestamp, ms, requestId, ...meta }) => {
    const colorize = ColorScheme[level] ?? ColorScheme.verbose;

    const formattedContext = colorize.bold(`  [${appName}::${context}]`);
    const formattedLevel = colorize.bold.inverse(`  ${level.toUpperCase()}  `);
    const formattedMs = ms ?? '';
    let formattedTime = timestamp ? `${timestamp} ${formattedMs}` : formattedMs;
    formattedTime = colorize(formattedTime ? `  ${formattedTime}  ` : '  ');
    const formattedId =
      requestId !== undefined ? colorize.bold.inverse(` Request ID: ${requestId} `) : '';
    const underlined = chalk.underline(`${formattedContext}${formattedTime}`);
    const firstLine = `${formattedLevel}${underlined}${formattedId}`;
    const formattedMessage = message;
    const formattedMeta = formatMeta(meta as ObjectLike, options);

    return `${firstLine}\n${formattedMessage}\n${formattedMeta}\n`;
  });
}

const stringify = createStringify({ circularValue: undefined });

function formatMeta(meta?: ObjectLike, { prettyPrint = false }: ConsoleFormatOptions = {}): string {
  if (meta === undefined || meta === null) return '';
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
