import { INestApplication, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';
import { AppModule } from './app.module';
import { AppBootstrapLog } from './common/utils/app-bootstrap-log';
import { envVars } from './config/env.validation';
import { WinstonLogger } from './logger/logger.service';
import { setupOpenApi } from './open-api/setup-open-api';

async function bootstrap(): Promise<void> {
  const appBootstrapLog = new AppBootstrapLog(envVars);
  appBootstrapLog.begin();

  const app = await NestEngine(envVars.USE_FASTIFY);

  const logger = await app.resolve(WinstonLogger);
  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  setupOpenApi(app);

  const { host, port } = envVars.address;
  await app.listen(port, host);

  appBootstrapLog.end();
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

async function NestEngine(useFastify: boolean): Promise<INestApplication> {
  const nestAppConfig: NestApplicationOptions = {
    bufferLogs: true,
    bodyParser: true,
  };
  if (!useFastify) {
    return NestFactory.create(AppModule, nestAppConfig);
  }
  const adapter = new FastifyAdapter();
  await adapter.register(contentParser);
  return NestFactory.create<NestFastifyApplication>(AppModule, adapter, nestAppConfig);
}
