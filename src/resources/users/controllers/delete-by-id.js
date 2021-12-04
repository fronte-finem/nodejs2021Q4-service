import { usersService } from '../user.service.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulEmptyResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';

export const deleteByIdController = ($userId) => ({
  schema: {
    summary: 'Delete user',
    description:
      'Deletes user by ID. When somebody\n DELETE User, all Tasks where User is assignee\n should be updated to put userId = null',
    tags: ['Users'],
    params: { ...makeUuidRequestParams([$userId]) },
    response: {
      ...makeSuccessfulEmptyResponse(
        HttpStatusCode.NO_CONTENT,
        'The user has been deleted'
      ),
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
    const success = await usersService.deleteById(userId);
    if (!success) {
      reply.notFound(`User with id [${userId}] not found!`);
    } else {
      reply.code(204).send();
    }
  },
});
