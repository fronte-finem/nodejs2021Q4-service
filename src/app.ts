import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { IS_DEV } from 'common/config';
import { buildApp } from 'common/build-app';
import { prettifier } from 'common/logger';
import { registerSwagger } from './common/swagger.js';
import { userRouter } from './resources/users/user.router.js';
import { boardRouter } from './resources/boards/board.router.js';
import { taskRouter } from './resources/tasks/task.router.js';

export const app = buildApp({}, IS_DEV && prettifier);

app.register(FastifyCORS);
app.register(FastifySensible);

registerSwagger(app);

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards' });