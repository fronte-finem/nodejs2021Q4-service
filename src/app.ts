import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { buildApp } from '~src/common/build-app';
import { IS_DEV } from '~src/common/config';
import { prettifier } from '~src/common/logger';
import { setupOpenApiDoc } from '~src/openaip/setup';
import { boardRouter } from '~src/resources/boards/board.router';
import { taskRouter } from '~src/resources/tasks/task.router';
import { userRouter } from '~src/resources/users/user.router';

export const app = buildApp({}, IS_DEV && prettifier);

app.register(FastifyCORS);
app.register(FastifySensible);

setupOpenApiDoc(app);

app.register(userRouter, { prefix: '/users' });
app.register(boardRouter, { prefix: '/boards' });
app.register(taskRouter, { prefix: '/boards' });
