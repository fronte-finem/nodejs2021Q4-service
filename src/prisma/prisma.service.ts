import { Global, INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { pd } from 'pretty-data';
import chalk from 'chalk';
import { highlight, HighlightOptions } from 'cli-highlight';
import { EnvConfig } from '../common/config';
import { isNotEmpty } from '../common/utils/data-helpers';
import { WinstonLogger } from '../logger/logger.service';

@Global()
@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel | Prisma.LogDefinition>
  implements OnModuleInit
{
  constructor(private readonly logger: WinstonLogger) {
    super({
      log: [
        { level: 'error', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'query', emit: 'event' },
      ],
      errorFormat: EnvConfig.isProd ? 'minimal' : 'pretty',
    });
    logger.setContext(PrismaService);
    this.bindLogger();
  }

  private bindLogger(): void {
    this.$on('error', (event) => this.logger.error(event));
    this.$on('warn', (event) => this.logger.warn(event));
    this.$on('info', (event) => this.logger.log(event));
    this.$on(
      'query',
      EnvConfig.isProd
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
