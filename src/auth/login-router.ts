import { FastifyPluginAsync } from 'fastify';
import { loginController } from './login-controller';

const ROOT_ROUTE = '/';

/**
 * Router (fastify plugin) for endpoint "tasks" nested in endpoint "boards"
 * @param app - instance of fastify
 * @returns empty promise
 */
export const loginRouter: FastifyPluginAsync = async (app) => {
  app.post(ROOT_ROUTE, loginController);
};
