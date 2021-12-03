import Fastify from 'fastify';
import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { userRouter } from './resources/users/user.router.js';
import { registerSwagger } from './common/swagger.js';

export const app = Fastify({ logger: true });

app.register(FastifyCORS);
app.register(FastifySensible);

registerSwagger(app);

app.get('/', async () => 'Service is running on Fastify!');

app.register(userRouter, { prefix: '/users' });
