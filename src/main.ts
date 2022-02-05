import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';
import { AppModule } from './app.module';
import { nestAppConfig, EnvConfig } from './common/config';
import { WINSTON_LOGGER_SERVICE_PROVIDER } from './logger/logger.types';
import { setupOpenApi } from './open-api/setup-open-api';

async function bootstrap() {
  const { useFastify, host, port } = EnvConfig;

  let app!: INestApplication;

  if (useFastify) {
    const adapter = new FastifyAdapter();
    await adapter.register(contentParser);
    app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter, nestAppConfig);
  } else {
    app = await NestFactory.create(AppModule, nestAppConfig);
  }

  const logger = await app.resolve(WINSTON_LOGGER_SERVICE_PROVIDER);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  setupOpenApi(app);

  await app.listen(port, host);

  logger.warn(`\n\tStarted on http://${host}:${port}`, 'Bootstrap');
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
