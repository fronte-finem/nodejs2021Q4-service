import { usersService } from '../user.service.js';
import { UserSchemaRef } from '../user.schema.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';

export const postController = {
  schema: {
    summary: 'Create user',
    description: 'Creates a new user (remove password from response)',
    tags: ['Users'],
    body: UserSchemaRef.CREATE,
    response: {
      201: UserSchemaRef.READ,
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
};
