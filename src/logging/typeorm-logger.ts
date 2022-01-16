import { Logger as PinoLogger } from 'pino';
import { Logger as TypeormLogger } from 'typeorm';
import { pd } from 'pretty-data';
import { PlatformTools } from 'typeorm/platform/PlatformTools';

export class TypeormPinoLoggerWrapper implements TypeormLogger {
  constructor(private readonly logger: PinoLogger) {}

  public logQuery(query: string, parameters?: unknown[]): void {
    this.logger.debug(
      handleParams(parameters),
      prepareMessage('query:', query)
    );
  }

  public logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[]
  ): void {
    this.logger.error(
      { ...handleParams(parameters), error },
      prepareMessage('query failed:', query)
    );
  }

  public logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[]
  ): void {
    this.logger.warn(
      { ...handleParams(parameters), 'execution time': time },
      prepareMessage('query is slow:', query)
    );
  }

  public logSchemaBuild(message: string): void {
    this.logger.debug(prepareMessage(message));
  }

  public logMigration(message: string): void {
    this.logger.debug(prepareMessage(message));
  }

  public log(level: 'log' | 'info' | 'warn', message: unknown): void {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
      default:
        this.logger.debug(message);
    }
  }
}

function handleParams(
  parameters?: unknown[]
): { parameters: unknown[] } | Record<string, never> {
  return parameters?.length ? { parameters } : {};
}

function prepareMessage(msg: string, query?: string): string {
  const prefix = `TypeORM >>> ${msg}`;
  if (!query) return prefix;
  return `${prefix}\n\n${PlatformTools.highlightSql(pd.sql(query))}\n`;
}
