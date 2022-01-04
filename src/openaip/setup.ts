import { FastifyInstance } from 'fastify';
import FastifySwagger, { FastifyDynamicSwaggerOptions } from 'fastify-swagger';
import { BoardSchema } from '../resources/boards/board.schema';
import { ColumnSchema } from '../resources/boards/column.schema';
import { TaskSchema } from '../resources/tasks/task.schema';
import { UserSchema } from '../resources/users/user.schema';
import { ResponseHttpError } from './response.http-error';

/**
 * OpenAPI documentation options for fastify-swagger
 */
const docOptions: FastifyDynamicSwaggerOptions = {
  routePrefix: '/doc',
  exposeRoute: true,
  openapi: {
    info: {
      title: 'Trello Service',
      description: "Let's try to create a competitor for Trello!",
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost' }],
  },
  uiConfig: {
    docExpansion: 'list',
    showExtensions: true,
    syntaxHighlight: { activate: true, theme: 'tomorrow-night' },
  },
};

/**
 * Setup OpenAPI documentation
 * @param app - fastify instance
 */
export const setupOpenApiDoc = (app: FastifyInstance): void => {
  app
    .addSchema(ResponseHttpError)
    .addSchema(UserSchema.READ)
    .addSchema(UserSchema.CREATE)
    .addSchema(UserSchema.UPDATE)
    .addSchema(UserSchema.LOGIN)
    .addSchema(ColumnSchema.READ)
    .addSchema(ColumnSchema.CREATE)
    .addSchema(ColumnSchema.UPDATE)
    .addSchema(BoardSchema.READ)
    .addSchema(BoardSchema.CREATE)
    .addSchema(BoardSchema.UPDATE)
    .addSchema(TaskSchema.READ)
    .addSchema(TaskSchema.CREATE)
    .addSchema(TaskSchema.UPDATE);
  app.register(FastifySwagger, docOptions);
};
