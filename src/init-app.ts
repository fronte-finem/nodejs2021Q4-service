import Fastify from 'fastify';
import FastifyCORS from 'fastify-cors';
import FastifySensible from 'fastify-sensible';
import { Connection } from 'typeorm';
import { authAccess } from './auth/auth-access';
import { appConfig } from './common/config';
import { getErrorMessage } from './common/get-error-message';
import { logger } from './logging/logger';
import {
  logFastifyError,
  logRequestBody,
  logResponseBody,
} from './logging/utils';
import { setupOpenApiDoc } from './openaip/setup';
import { boardRouter } from './resources/boards/board.router';
import { loginRouter } from './auth/login-router';
import { taskRouter } from './resources/tasks/task.router';
import { userRouter } from './resources/users/user.router';

enum AuthRoutePrefix {
  USERS = '/users',
  BOARDS = '/boards',
}

export const initApp = async (dbConnection: Connection): Promise<boolean> => {
  const app = Fastify({ logger });

  app.addHook('onError', logFastifyError);
  app.addHook('preHandler', logRequestBody);
  app.addHook('preSerialization', logResponseBody);

  app.register(FastifyCORS);
  app.register(FastifySensible);
  setupOpenApiDoc(app);

  app.register(loginRouter, { prefix: '/login' });
  app.addHook('onRequest', authAccess(Object.values(AuthRoutePrefix)));
  app.register(userRouter, { prefix: AuthRoutePrefix.USERS });
  app.register(boardRouter, { prefix: AuthRoutePrefix.BOARDS });
  app.register(taskRouter, { prefix: AuthRoutePrefix.BOARDS });

  try {
    app.log.info('Running app... ᓚᘏᗢ');
    await app.listen(appConfig);
    app.log.info('App is running (^_^)');
    return true;
  } catch (error) {
    app.log.fatal(getErrorMessage(error));
    try {
      await dbConnection?.close();
    } catch (dbDisconnectError) {
      app.log.error(getErrorMessage(dbDisconnectError));
    }
    return false;
  }
};
