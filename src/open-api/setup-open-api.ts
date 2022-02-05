import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvConfig } from '../common/config';

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
  SwaggerModule.setup(EnvConfig.openApiRoute, app, document);
}
