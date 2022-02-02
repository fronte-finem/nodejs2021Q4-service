import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel | Prisma.LogDefinition>
  implements OnModuleInit
{
  constructor(private readonly logger: Logger) {
    super({
      log: [
        { level: 'error', emit: 'event' },
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'query', emit: 'event' },
      ],
      errorFormat: 'pretty',
    });
    this.bindLogger();
  }

  private bindLogger(): void {
    const context = PrismaService.name;
    this.$on('error', (event) => this.logger.error(event, context));
    this.$on('warn', (event) => this.logger.warn(event, context));
    this.$on('info', (event) => this.logger.log(event, context));
    this.$on('query', (event) => this.logger.debug(event, context));
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
