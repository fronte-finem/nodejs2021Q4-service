import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponseEmpty } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { UsersService } from '../user.service';
import { IUserRequest, PARAM_USER_ID } from './user-types';

const schema: FastifySchema = {
  summary: 'Delete user',
  description:
    'Deletes user by ID. When somebody\n DELETE User, all Tasks where User is assignee\n should be updated to put userId = null',
  tags: [OpenApiEndpointTag.USERS],
  params: makeOpenAPIUuidRequestParams([PARAM_USER_ID]),
  response: {
    ...makeOpenApiHttpResponseEmpty(
      'The user has been deleted',
      HttpStatusCode.NO_CONTENT
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

/**
 * Handler for http-method DELETE on route "/users/:userId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<Omit<IUserRequest, 'Body'>> = async (
  request,
  reply
) => {
  const userId = request.params[PARAM_USER_ID];
  const success = await UsersService.delete(userId);
  if (!success) {
    reply.notFound(`User with id [${userId}] not found!`);
  } else {
    reply.code(204).send();
  }
};

export const deleteByIdController = { schema, handler };
