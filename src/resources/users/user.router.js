import { readController } from './controllers/user.read.js';
import { readByIdController } from './controllers/user.read-by-id.js';
import { createController } from './controllers/user.create.js';
import { deleteByIdController } from './controllers/user.delete-by-id.js';
import { updateByIdController } from './controllers/user.update-by-id.js';

const USER_ID = 'userId';

/**
 * @type { import('fastify').FastifyPluginAsync }
 */
export const userRouter = async (fastify) => {
  fastify.get('/', readController());
  fastify.get(`/:${USER_ID}`, readByIdController(USER_ID));
  fastify.post('/', createController());
  fastify.delete(`/:${USER_ID}`, deleteByIdController(USER_ID));
  fastify.put(`/:${USER_ID}`, updateByIdController(USER_ID));
};
