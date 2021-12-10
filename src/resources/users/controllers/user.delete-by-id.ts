import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponseEmpty } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { usersService } from '../user.service';
import { IUserRequest, PARAM_USER_ID } from './user-types';

const schema: FastifySchema = {
  summary: 'Delete user',
  description:
    'Deletes user by ID. When somebody\n DELETE User, all Tasks where User is assignee\n should be updated to put userId = null',
  tags: [ApiEndpointTag.USERS],
  params: { ...makeUuidRequestParams([PARAM_USER_ID]) },
  response: {
    ...makeHttpResponseEmpty(
      'The user has been deleted',
      HttpStatusCode.NO_CONTENT
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

const handler: RouteHandler<Omit<IUserRequest, 'Body'>> = async (
  request,
  reply
) => {
  const userId = request.params[PARAM_USER_ID];
  const success = await usersService.delete(userId);
  if (!success) {
    reply.notFound(`User with id [${userId}] not found!`);
  } else {
    reply.code(204).send();
  }
};

export const deleteByIdController = { schema, handler };
