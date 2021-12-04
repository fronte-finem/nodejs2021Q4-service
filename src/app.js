import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { userRouter } from './resources/users/user.router.js';
import { registerSwagger } from './common/swagger.js';
import { boardRouter } from './resources/boards/board.router.js';
import { buildApp } from './common/build-app.js';

export const app = buildApp();

app.register(FastifyCORS);
app.register(FastifySensible);

registerSwagger(app);

app.get('/', async () => 'Service is running on Fastify!');

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
