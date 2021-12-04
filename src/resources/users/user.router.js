import { readController } from './controllers/read.js';
import { readByIdController } from './controllers/read-by-id.js';
import { createController } from './controllers/create.js';
import { deleteByIdController } from './controllers/delete-by-id.js';
import { updateByIdController } from './controllers/update-by-id.js';

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
