import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { nestAppConfig, nestServerConfig } from './common/config';
import { loggerConfig } from './common/logger.config';
import { setupOpenApi } from './open-api/setup-open-api';

async function bootstrap() {
  const { host, port, isFastify } = nestServerConfig;

  const config: NestApplicationOptions = {
    ...nestAppConfig,
    bodyParser: true,
    logger: WinstonModule.createLogger(loggerConfig),
  };

  const app = await (isFastify
    ? NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), config)
    : NestFactory.create(AppModule, config));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
    })
  );

  setupOpenApi(app);

  await app.listen(port, host);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
