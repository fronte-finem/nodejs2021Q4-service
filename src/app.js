import { resolve } from 'path';
import Fastify from 'fastify';
import FastifyCORS from 'fastify-cors';
import FastifySwagger from 'fastify-swagger';
import FastifySensible from 'fastify-sensible';
import { userRouter } from './resources/users/user.router.js';
import { ROOT_PATH } from '../root.js';

export const app = Fastify({ logger: true });

app.register(FastifyCORS);
app.register(FastifySensible);

app.get('/', async () => 'Service is running on Fastify!');

app.register(userRouter, { prefix: '/users' });

app.register(FastifySwagger, {
  routePrefix: '/doc',
  exposeRoute: true,
  mode: 'static',
  specification: {
    path: resolve(ROOT_PATH, 'doc/api.yaml'),
  },
});
