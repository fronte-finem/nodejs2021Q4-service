import { FastifyPluginAsync } from 'fastify';
import { readController } from './controllers/task.read';
import { readByIdController } from './controllers/task.read-by-id';
import { createController } from './controllers/task.create';
import { deleteByIdController } from './controllers/task.delete-by-id';
import { updateByIdController } from './controllers/task.update-by-id';

const BOARD_ID = 'boardId';
const TASK_ID = 'taskId';

const boardRoute = `/:${BOARD_ID}/tasks`;
const taskRoute = `${boardRoute}/:${TASK_ID}`;

export const taskRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get(boardRoute, readController(BOARD_ID));
  fastify.get(taskRoute, readByIdController(BOARD_ID, TASK_ID));
  fastify.post(boardRoute, createController(BOARD_ID));
  fastify.delete(taskRoute, deleteByIdController(BOARD_ID, TASK_ID));
  fastify.put(taskRoute, updateByIdController(BOARD_ID, TASK_ID));
};
