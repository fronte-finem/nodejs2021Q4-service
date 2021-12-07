import { FastifyPluginAsync } from 'fastify';
import { readController } from './controllers/user.read';
import { readByIdController } from './controllers/user.read-by-id';
import { createController } from './controllers/user.create';
import { deleteByIdController } from './controllers/user.delete-by-id';
import { updateByIdController } from './controllers/user.update-by-id';

const USER_ID = 'userId';

export const userRouter: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', readController());
  fastify.get(`/:${USER_ID}`, readByIdController(USER_ID));
  fastify.post('/', createController());
  fastify.delete(`/:${USER_ID}`, deleteByIdController(USER_ID));
  fastify.put(`/:${USER_ID}`, updateByIdController(USER_ID));
};
