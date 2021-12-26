import { FastifyPluginAsync } from 'fastify';
import { fastifyErrorHandler } from '../../logging/utils';
import { PARAM_BOARD_ID, PARAM_TASK_ID } from './controllers/task-types';
import { createController } from './controllers/task.create';
import { deleteByIdController } from './controllers/task.delete-by-id';
import { readController } from './controllers/task.read';
import { readByIdController } from './controllers/task.read-by-id';
import { updateByIdController } from './controllers/task.update-by-id';

const ROOT_ROUTE = `/:${PARAM_BOARD_ID}/tasks`;
const ID_ROUTE = `/:${PARAM_BOARD_ID}/tasks/:${PARAM_TASK_ID}`;

/**
 * Router (fastify plugin) for endpoint "tasks" nested in endpoint "boards"
 * @param app - instance of fastify
 * @returns empty promise
 */
export const taskRouter: FastifyPluginAsync = async (app) => {
  app.post(ROOT_ROUTE, createController);
  app.get(ROOT_ROUTE, readController);
  app.get(ID_ROUTE, readByIdController);
  app.delete(ID_ROUTE, deleteByIdController);
  app.put(ID_ROUTE, updateByIdController);
};
