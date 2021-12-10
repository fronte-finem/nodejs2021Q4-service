import { FastifyPluginAsync } from 'fastify';
import { PARAM_BOARD_ID } from './controllers/board-types';
import { createController } from './controllers/board.create';
import { deleteByIdController } from './controllers/board.delete-by-id';
import { readController } from './controllers/board.read';
import { readByIdController } from './controllers/board.read-by-id';
import { updateByIdController } from './controllers/board.update-by-id';

const ROOT_URL = '/';
const ID_URL = `/:${PARAM_BOARD_ID}`;

export const boardRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(ROOT_URL, createController);
  fastify.get(ROOT_URL, readController);
  fastify.get(ID_URL, readByIdController);
  fastify.delete(ID_URL, deleteByIdController);
  fastify.put(ID_URL, updateByIdController);
};
