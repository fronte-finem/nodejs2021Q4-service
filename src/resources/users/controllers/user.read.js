import { usersService } from '../user.service.js';
import { UserSchemaID } from '../user.schema.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulArrayResponse } from '../../../common/response.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const readController = () => ({
  schema: {
    summary: 'Get all users',
    description: 'Gets all users (remove password from response)',
    tags: [ApiEndpointTag.USERS],
    response: {
      ...makeSuccessfulArrayResponse(UserSchemaID.READ),
      ...HttpErrorResponse.UNAUTHORIZED,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const users = await usersService.readAll();
    reply.send(users);
  },
});
