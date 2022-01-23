import { FastifyPluginAsync } from 'fastify';
import { onRequestCheckAuth } from '../../auth/hooks/on-request-check-auth';
import { fastifyErrorHandler } from '../../logging/utils';
import { PARAM_BOARD_ID } from './controllers/board-types';
import { createController } from './controllers/board.create';
import { deleteByIdController } from './controllers/board.delete-by-id';
import { readController } from './controllers/board.read';
import { readByIdController } from './controllers/board.read-by-id';
import { updateByIdController } from './controllers/board.update-by-id';

const ROOT_URL = '/';
const ID_URL = `/:${PARAM_BOARD_ID}`;

/**
 * Router (fastify plugin) for endpoint "boards"
 * @param app - instance of fastify
 * @returns empty promise
 */
export const boardRouter: FastifyPluginAsync = async (app) => {
  app.setErrorHandler(fastifyErrorHandler);
  app.addHook('onRequest', onRequestCheckAuth);
  app.post(ROOT_URL, createController);
  app.get(ROOT_URL, readController);
  app.get(ID_URL, readByIdController);
  app.delete(ID_URL, deleteByIdController);
  app.put(ID_URL, updateByIdController);
};
