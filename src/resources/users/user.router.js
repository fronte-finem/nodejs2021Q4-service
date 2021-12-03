import { getAllController } from './controllers/get-all.js';
import { getByIdController } from './controllers/get-by-id.js';
import { postController } from './controllers/post.js';

/**
 * @type { import('fastify').FastifyPluginAsync }
 */
export const userRouter = async (fastify) => {
  fastify.get('/', getAllController);
  fastify.get('/:id', getByIdController);
  fastify.post('/', postController);
};
