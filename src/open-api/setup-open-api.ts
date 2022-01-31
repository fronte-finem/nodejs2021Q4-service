import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { nestServerConfig } from '../common/config';

const { openApiRoute } = nestServerConfig;

const openApiConfig = new DocumentBuilder()
  .setTitle('Trello Service')
  .setDescription("Let's try to create a competitor for Trello!")
  .setVersion('1.0.0')
  .build();

export function setupOpenApi(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup(openApiRoute, app, document);
}
