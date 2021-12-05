import { readController } from './controllers/read.js';
import { readByIdController } from './controllers/read-by-id.js';
import { createController } from './controllers/create.js';
import { deleteByIdController } from './controllers/delete-by-id.js';
import { updateByIdController } from './controllers/update-by-id.js';

const BOARD_ID = 'boardId';
const TASK_ID = 'taskId';

const boardRoute = `/:${BOARD_ID}/tasks`;
const taskRoute = `${boardRoute}/:${TASK_ID}`;

/**
 * @type { import('fastify').FastifyPluginAsync }
 */
export const taskRouter = async (fastify) => {
  fastify.get(boardRoute, readController(BOARD_ID));
  fastify.get(taskRoute, readByIdController(BOARD_ID, TASK_ID));
  fastify.post(boardRoute, createController(BOARD_ID));
  fastify.delete(taskRoute, deleteByIdController(BOARD_ID, TASK_ID));
  fastify.put(taskRoute, updateByIdController(BOARD_ID, TASK_ID));
};
