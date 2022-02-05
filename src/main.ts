import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';
import { AppModule } from './app.module';
import { EnvConfig, nestAppConfig } from './common/config';
import { AppBootstrapLog } from './common/utils/app-bootstrap-log';
import { WINSTON_LOGGER_SERVICE_PROVIDER } from './logger/logger.types';
import { setupOpenApi } from './open-api/setup-open-api';

async function bootstrap(): Promise<void> {
  const appBootstrapLog = new AppBootstrapLog();
  appBootstrapLog.begin(EnvConfig);

  const { useFastify, host, port } = EnvConfig;

  const app = await NestEngine(useFastify);

  const logger = await app.resolve(WINSTON_LOGGER_SERVICE_PROVIDER);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  setupOpenApi(app);

  await app.listen(port, host);
  appBootstrapLog.end(EnvConfig);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

async function NestEngine(useFastify: boolean): Promise<INestApplication> {
  if (useFastify) {
    const adapter = new FastifyAdapter();
    await adapter.register(contentParser);
    return NestFactory.create<NestFastifyApplication>(AppModule, adapter, nestAppConfig);
  }
  return NestFactory.create(AppModule, nestAppConfig);
}
