import { FastifyPluginAsync } from 'fastify';
import { loginController } from './login-controller';

const ROOT_ROUTE = '/';

export const loginRouter: FastifyPluginAsync = async (app) => {
  app.post(ROOT_ROUTE, loginController);
};
