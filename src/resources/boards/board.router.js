import { readController } from './controllers/board.read.js';
import { readByIdController } from './controllers/board.read-by-id.js';
import { createController } from './controllers/board.create.js';
import { deleteByIdController } from './controllers/board.delete-by-id.js';
import { updateByIdController } from './controllers/board.update-by-id.js';

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
