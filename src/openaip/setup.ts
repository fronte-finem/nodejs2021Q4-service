import { FastifyInstance } from 'fastify';
import FastifySwagger, { FastifyDynamicSwaggerOptions } from 'fastify-swagger';
import { LoginResponsePayloadSchema } from '../auth/login-controller';
import { appConfig } from '../common/config';
import { BoardSchema } from '../resources/boards/board.schema';
import { ColumnSchema } from '../resources/column/column.schema';
import { TaskSchema } from '../resources/tasks/task.schema';
import { UserSchema } from '../resources/users/user.schema';
import { APP_SECURITY_SCHEME_ID } from './constants';
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
    servers: [{ url: `http://localhost:${appConfig.port}` }],
    components: {
      securitySchemes: {
        [APP_SECURITY_SCHEME_ID]: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
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
    .addSchema(LoginResponsePayloadSchema)
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
