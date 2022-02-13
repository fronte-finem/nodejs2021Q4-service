import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfigService } from '../config/env.config.service';

export enum OpenApiTag {
  APP = 'App',
  LOGIN = 'Login',
  FILE = 'File',
  USERS = 'Users',
  BOARDS = 'Boards',
  COLUMNS = 'Columns',
  TASKS = 'Tasks',
}

const openApiDocument = new DocumentBuilder()
  .setTitle('Trello Service')
  .setDescription("Let's try to create a competitor for Trello!")
  .setVersion('1.0.0')
  .addBearerAuth();
Object.values(OpenApiTag).forEach((tag) => openApiDocument.addTag(tag));

export function setupOpenApi(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, openApiDocument.build());
  const configService = app.get(EnvConfigService);
  SwaggerModule.setup(configService.get('OPEN_API_ROUTE'), app, document);
}
