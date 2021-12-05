import { readController } from './controllers/read.js';
import { readByIdController } from './controllers/read-by-id.js';
import { createController } from './controllers/create.js';
import { deleteByIdController } from './controllers/delete-by-id.js';
import { updateByIdController } from './controllers/update-by-id.js';

const BOARD_ID = 'boardId';

/**
 * @type { import('fastify').FastifyPluginAsync }
 */
export const boardRouter = async (fastify) => {
  fastify.get('/', readController());
  fastify.get(`/:${BOARD_ID}`, readByIdController(BOARD_ID));
  fastify.post('/', createController());
  fastify.delete(`/:${BOARD_ID}`, deleteByIdController(BOARD_ID));
  fastify.put(`/:${BOARD_ID}`, updateByIdController(BOARD_ID));
};
