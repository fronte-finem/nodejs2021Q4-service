import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { nestAppConfig, nestServerConfig } from './common/config';
import { WINSTON_LOGGER_SERVICE_PROVIDER } from './logger/logger.constants';
import { setupOpenApi } from './open-api/setup-open-api';

async function bootstrap() {
  const { host, port, isFastify } = nestServerConfig;

  const app = await (isFastify
    ? NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), nestAppConfig)
    : NestFactory.create(AppModule, nestAppConfig));

  const logger = await app.resolve(WINSTON_LOGGER_SERVICE_PROVIDER);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  setupOpenApi(app);

  await app.listen(port, host);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
