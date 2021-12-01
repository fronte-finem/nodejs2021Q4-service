import { User } from './user.model.js';
import { usersService } from './user.service.js';

const schema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
      },
      required: ['id'],
      additionalProperties: false,
    },
  },
};

/**
 * @type { import('fastify').FastifyPluginAsync }
 */
export const userRouter = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    reply.send(users.map(User.toResponse));
  });

  fastify.get('/:id', schema, async (request, reply) => {
    const { id } = request.params;
    const maybeUser = await usersService.getById(id);
    if (!maybeUser) {
      throw fastify.httpErrors.notFound(`User with id [${id}] not found!`);
    }
    reply.send(User.toResponse(maybeUser));
  });

  fastify.post('/', async (request, replay) => {
    const userDto = request.body;
    console.log(userDto);
    const user = await usersService.create(userDto);
    console.log(user);
    replay.code(201).send(user);
  });
};
