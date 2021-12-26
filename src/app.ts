import Fastify from 'fastify';
import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { logger } from './logging/logger';
import {
  fastifyErrorHandler,
  logRequestBody,
  uncaughtErrorHandler,
} from './logging/utils';
import { setupOpenApiDoc } from './openaip/setup';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';
import { userRouter } from './resources/users/user.router';

process.on('uncaughtException', uncaughtErrorHandler);
process.on('unhandledRejection', uncaughtErrorHandler);

export const app = Fastify({ logger });

app.addHook('preHandler', logRequestBody);
app.setErrorHandler(fastifyErrorHandler);

app.register(FastifyCORS);
app.register(FastifySensible);

setupOpenApiDoc(app);

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards' });

// Promise.reject(new Error('(-_-) reject Oops!')).then(null);

// throw new Error('(x_x) throw Oops!');
