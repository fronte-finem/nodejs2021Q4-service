import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IS_FASTIFY } from './common/config';

const nestConfig: NestApplicationOptions = {
  logger: ['verbose'],
  // bodyParser: !IS_FASTIFY,
};

async function bootstrap() {
  const app = await (IS_FASTIFY
    ? NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), nestConfig)
    : NestFactory.create(AppModule, nestConfig));

  const openApiConfig = new DocumentBuilder()
    .setTitle('Trello Service')
    .setDescription("Let's try to create a competitor for Trello!")
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
