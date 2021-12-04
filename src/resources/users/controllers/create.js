import { usersService } from '../user.service.js';
import { UserSchemaID, UserSchemaRef } from '../user.schema.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';

export const createController = () => ({
  schema: {
    summary: 'Create user',
    description: 'Creates a new user (remove password from response)',
    tags: ['Users'],
    body: UserSchemaRef.CREATE,
    response: {
      ...makeSuccessfulResponse(
        UserSchemaID.READ,
        HttpStatusCode.CREATED,
        'The user has been created.'
      ),
      ...HttpErrorResponse.BAD_REQUEST,
      ...HttpErrorResponse.UNAUTHORIZED,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const userDto = request.body;
    const user = await usersService.create(userDto);
    reply.code(201).send(user);
  },
});
