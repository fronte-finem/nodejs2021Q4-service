import { User } from '../user.model.js';
import { usersService } from '../user.service.js';
import { UserSchemaID } from '../user.schema.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';

export const getAllController = {
  schema: {
    summary: 'Get all users',
    description: 'Gets all users (remove password from response)',
    tags: ['Users'],
    response: {
      200: {
        description: 'Successful response',
        type: 'array',
        items: {
          $ref: UserSchemaID.READ,
        },
      },
      ...HttpErrorResponse.UNAUTHORIZED,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const users = await usersService.getAll();
    reply.send(users.map(User.toResponse));
  },
};
