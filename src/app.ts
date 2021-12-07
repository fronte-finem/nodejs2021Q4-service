import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { IS_DEV } from 'common/config';
import { buildApp } from 'common/build-app';
import { prettifier } from 'common/logger';
import { setupOpenApiDoc } from 'openaip/setup';
import { userRouter } from 'resources/users/user.router';
import { boardRouter } from 'resources/boards/board.router';
import { taskRouter } from 'resources/tasks/task.router';

export const app = buildApp({}, IS_DEV && prettifier);

app.register(FastifyCORS);
app.register(FastifySensible);

setupOpenApiDoc(app);

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards' });
