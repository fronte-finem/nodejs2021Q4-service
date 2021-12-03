// import { resolve } from 'path';
import FastifySwagger from 'fastify-swagger';
// import { ROOT_PATH } from '../../root.js';
import { addSchemas } from './schemas.js';

export const registerSwagger = (app) => {
  addSchemas(app);

  app.register(FastifySwagger, {
    routePrefix: '/doc',
    exposeRoute: true,
    openapi: {
      info: {
        title: 'Trello Service',
        description: "Let's try to create a competitor for Trello!",
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost' }],
      tags: ['Users', 'Boards', 'Tasks', 'Login'],
      components: {
        responses: {},
      },
    },
    uiConfig: {
      docExpansion: 'list',
      showExtensions: true,
      syntaxHighlight: { activate: true, theme: 'tomorrow-night' },
    },
  });

  // app.register(FastifySwagger, {
  //   routePrefix: '/doc',
  //   exposeRoute: true,
  //   mode: 'static',
  //   specification: {
  //     path: resolve(ROOT_PATH, 'doc/api.yaml'),
  //   },
  // });
};
