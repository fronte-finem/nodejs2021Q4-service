import { FastifyInstance } from 'fastify';
import FastifySwagger, { FastifyDynamicSwaggerOptions } from 'fastify-swagger';
import { ApiEndpointTag } from 'common/constants';
import { UserSchema } from 'resources/users/user.schema';
import { ColumnSchema } from 'resources/boards/column.schema';
import { BoardSchema } from 'resources/boards/board.schema';
import { TaskSchema } from 'resources/tasks/task.schema';
import { ResponseHttpError } from './response.http-error';

/**
 * {@link https://swagger.io/specification/ | OpenAPI} documentation options for {@link https://github.com/fastify/fastify-swagger | fastify-swagger}
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
    tags: Object.values(ApiEndpointTag),
  },
  uiConfig: {
    docExpansion: 'list',
    showExtensions: true,
    syntaxHighlight: { activate: true, theme: 'tomorrow-night' },
  },
};

/**
 * Setup {@link https://swagger.io/specification/ | OpenAPI} documentation
 * @param app - fastify instance
 */
export const setupOpenApiDoc = (app: FastifyInstance): void => {
  app
    .addSchema(ResponseHttpError)
    .addSchema(UserSchema.MODEL)
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
