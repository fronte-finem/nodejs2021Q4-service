import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
