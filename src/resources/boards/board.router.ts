import { FastifyPluginAsync } from 'fastify';
import { readController } from './controllers/board.read';
import { readByIdController } from './controllers/board.read-by-id';
import { createController } from './controllers/board.create';
import { deleteByIdController } from './controllers/board.delete-by-id';
import { updateByIdController } from './controllers/board.update-by-id';

const BOARD_ID = 'boardId';

export const boardRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', readController());
  fastify.get(`/:${BOARD_ID}`, readByIdController(BOARD_ID));
  fastify.post('/', createController());
  fastify.delete(`/:${BOARD_ID}`, deleteByIdController(BOARD_ID));
  fastify.put(`/:${BOARD_ID}`, updateByIdController(BOARD_ID));
};
