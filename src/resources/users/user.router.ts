import { FastifyPluginAsync } from 'fastify';
import { PARAM_USER_ID } from './controllers/user-types';
import { createController } from './controllers/user.create';
import { deleteByIdController } from './controllers/user.delete-by-id';
import { readController } from './controllers/user.read';
import { readByIdController } from './controllers/user.read-by-id';
import { updateByIdController } from './controllers/user.update-by-id';

const ROOT_URL = '/';
const ID_URL = `/:${PARAM_USER_ID}`;

export const userRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(ROOT_URL, createController);
  fastify.get(ROOT_URL, readController);
  fastify.get(ID_URL, readByIdController);
  fastify.put(ID_URL, updateByIdController);
  fastify.delete(ID_URL, deleteByIdController);
};
