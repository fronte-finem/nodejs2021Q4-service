import { FastifyPluginAsync } from 'fastify';
import { fastifyErrorHandler } from '../../logging/utils';
import { PARAM_USER_ID } from './controllers/user-types';
import { createController } from './controllers/user.create';
import { deleteByIdController } from './controllers/user.delete-by-id';
import { readController } from './controllers/user.read';
import { readByIdController } from './controllers/user.read-by-id';
import { updateByIdController } from './controllers/user.update-by-id';

const ROOT_URL = '/';
const ID_URL = `/:${PARAM_USER_ID}`;

/**
 * Router (fastify plugin) for endpoint "users"
 * @param app - instance of fastify
 * @returns empty promise
 */
export const userRouter: FastifyPluginAsync = async (app) => {
  app.post(ROOT_URL, createController);
  app.get(ROOT_URL, readController);
  app.get(ID_URL, readByIdController);
  app.put(ID_URL, updateByIdController);
  app.delete(ID_URL, deleteByIdController);
};
