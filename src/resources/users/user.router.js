import { User } from './user.model.js';

import { usersService } from './user.service.js';

/**
 * @type { import('fastify').FastifyPluginAsync }
 */
export const userRouter = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    reply.send(users.map(User.toResponse));
  });
};
