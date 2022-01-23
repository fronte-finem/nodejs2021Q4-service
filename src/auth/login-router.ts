import { FastifyPluginAsync } from 'fastify';
import { fastifyErrorHandler } from '../logging/utils';
import { loginController } from './login-controller';

const ROOT_ROUTE = '/';

/**
 * Router (fastify plugin) for endpoint "tasks" nested in endpoint "boards"
 * @param app - instance of fastify
 * @returns empty promise
 */
export const loginRouter: FastifyPluginAsync = async (app) => {
  app.setErrorHandler(fastifyErrorHandler);
  app.post(ROOT_ROUTE, loginController);
};
