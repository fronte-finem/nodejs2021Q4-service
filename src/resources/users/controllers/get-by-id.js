import { UserSchemaRef } from '../user.schema.js';
import { usersService } from '../user.service.js';
import { User } from '../user.model.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';

export const getByIdController = {
  schema: {
    summary: 'Get user by ID',
    description: 'Gets a user by ID',
    tags: ['Users'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
      },
      required: ['id'],
      additionalProperties: false,
    },
    response: {
      200: UserSchemaRef.READ,
      ...HttpErrorResponse.BAD_REQUEST,
      ...HttpErrorResponse.UNAUTHORIZED,
      ...HttpErrorResponse.NOT_FOUND,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const { id } = request.params;
    const maybeUser = await usersService.getById(id);
    if (!maybeUser) {
      reply.notFound(`User with id [${id}] not found!`);
    } else {
      reply.send(User.toResponse(maybeUser));
    }
  },
};
