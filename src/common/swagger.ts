import { FastifyInstance } from 'fastify';
import FastifySwagger, { FastifyDynamicSwaggerOptions } from 'fastify-swagger';
import { addSchemas } from './schemas';
import { ApiEndpointTag } from './constants';

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
export const registerSwagger = (app: FastifyInstance): void => {
  addSchemas(app);
  app.register(FastifySwagger, docOptions);
};
