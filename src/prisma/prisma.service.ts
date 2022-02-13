import { Global, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { pd } from 'pretty-data';
import chalk from 'chalk';
import { highlight, HighlightOptions } from 'cli-highlight';
import { isNotEmpty } from '../common/utils/data-helpers';
import { EnvironmentVariables } from '../config/env.validation';
import { WinstonLogger } from '../logger/logger.service';
import { WinstonLogLevel } from '../logger/logger.types';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel | Prisma.LogDefinition>
  implements OnModuleInit
{
  constructor(
    private configService: ConfigService<EnvironmentVariables, true>,
    private readonly logger: WinstonLogger
  ) {
    const isProd = configService.get('isProd', { infer: true });
    const loglevel = configService.get('LOG_LEVEL', { infer: true });
    super({
      log: mapLogEvents(loglevel),
      errorFormat: isProd ? 'minimal' : 'pretty',
    });
    logger.setContext(PrismaService);
    this.bindLogger(isProd, loglevel);
  }

  private bindLogger(isProd: boolean, loglevel: WinstonLogLevel): void {
    this.$on('error', (event) => this.logger.error(event));
    if (loglevel === 'error') return;
    this.$on('warn', (event) => this.logger.warn(event));
    if (loglevel === 'warn') return;
    this.$on('info', (event) => this.logger.log(event));
    if (loglevel === 'info') return;
    this.$on(
      'query',
      isProd
        ? (event) => this.logger.debug(event)
        : (event) => this.logger.debug(prettyQuery(event))
    );
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

function mapLogEvents(winstonLogLevel: WinstonLogLevel): Prisma.LogDefinition[] {
  const defs = [logDef('query'), logDef('info'), logDef('warn'), logDef('error')];

  switch (winstonLogLevel) {
    case 'error':
      return defs.slice(3);
    case 'warn':
      return defs.slice(2);
    case 'info':
      return defs.slice(1);
    case 'debug':
    case 'verbose':
    default:
      return defs;
  }

  function logDef(level: Prisma.LogLevel): Prisma.LogDefinition {
    return { level, emit: 'event' };
  }
}

const sqlHighlightOptions: HighlightOptions = {
  language: 'sql',
  theme: {
    keyword: chalk.magentaBright,
    literal: chalk.green,
    function: chalk.rgb(255, 127, 0),
    string: chalk.rgb(0, 127, 255),
    type: chalk.yellowBright,
    built_in: chalk.magenta,
    variable: chalk.blueBright,
    symbol: chalk.redBright,
    number: chalk.greenBright,
    quote: chalk.gray,
    comment: chalk.gray.italic,
    default: chalk.gray,
  },
};

function prettyQuery({ query, params, duration }: Prisma.QueryEvent): Record<string, unknown> {
  const info: Record<string, unknown> = {};
  let parsedParams: unknown;
  try {
    parsedParams = JSON.parse(params);
  } catch {
    parsedParams = params;
  }
  const parsedDuration = Number(duration);
  info.message = highlight(pd.sql(query), sqlHighlightOptions);
  if (isNotEmpty(parsedParams)) info.params = parsedParams;
  if (parsedDuration) info.duration = parsedDuration;
  return info;
}
