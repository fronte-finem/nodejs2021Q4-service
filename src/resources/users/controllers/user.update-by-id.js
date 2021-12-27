import { UserSchemaID, UserSchemaRef } from '../user.schema.js';
import { usersService } from '../user.service.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const updateByIdController = ($userId) => ({
  schema: {
    summary: 'Update a user',
    description: 'Updates a user by ID',
    tags: [ApiEndpointTag.USERS],
    params: {
      ...makeUuidRequestParams([$userId]),
    },
    body: UserSchemaRef.UPDATE,
    response: {
      ...makeSuccessfulResponse(
        UserSchemaID.READ,
        HttpStatusCode.OK,
        'The user has been updated.'
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
    const userDto = request.body;
    const maybeUser = await usersService.update(userId, userDto);
    if (!maybeUser) {
      reply.notFound(`User with id [${userId}] not found!`);
    } else {
      reply.send(maybeUser);
    }
  },
});
