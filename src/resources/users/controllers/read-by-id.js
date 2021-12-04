import { UserSchemaID } from '../user.schema.js';
import { usersService } from '../user.service.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';

export const readByIdController = ($userId) => ({
  schema: {
    summary: 'Get user by ID',
    description: 'Gets a user by ID',
    tags: ['Users'],
    params: {
      ...makeUuidRequestParams([$userId]),
    },
    response: {
      ...makeSuccessfulResponse(UserSchemaID.READ),
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
    const userId = request.params[$userId];
    const maybeUser = await usersService.getById(userId);
    if (!maybeUser) {
      reply.notFound(`User with id [${userId}] not found!`);
    } else {
      reply.send(maybeUser);
    }
  },
});
