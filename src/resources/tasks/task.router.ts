import { FastifyPluginAsync } from 'fastify';
import { PARAM_BOARD_ID } from '../boards/controllers/board-types';
import { PARAM_TASK_ID } from './controllers/task-types';
import { createController } from './controllers/task.create';
import { deleteByIdController } from './controllers/task.delete-by-id';
import { readController } from './controllers/task.read';
import { readByIdController } from './controllers/task.read-by-id';
import { updateByIdController } from './controllers/task.update-by-id';

const ROOT_ROUTE = `/:${PARAM_BOARD_ID}/tasks`;
const ID_ROUTE = `/:${PARAM_BOARD_ID}/tasks/:${PARAM_TASK_ID}`;

export const taskRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(ROOT_ROUTE, createController);
  fastify.get(ROOT_ROUTE, readController);
  fastify.get(ID_ROUTE, readByIdController);
  fastify.delete(ID_ROUTE, deleteByIdController);
  fastify.put(ID_ROUTE, updateByIdController);
};
