import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { usersService } from '../user.service';
import { IUserRequest, PARAM_USER_ID } from './user-types';

const schema: FastifySchema = {
  summary: 'Get user by ID',
  description:
    'Gets a user by ID\n e.g. “/users/123” (remove password from response)',
  tags: [ApiEndpointTag.USERS],
  params: {
    ...makeUuidRequestParams([PARAM_USER_ID]),
  },
  response: {
    ...makeHttpResponse(UserSchemaID.READ),
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
  const maybeUser = await usersService.read(userId);
  if (!maybeUser) {
    reply.notFound(`User with id [${userId}] not found!`);
  } else {
    reply.send(maybeUser);
  }
};

export const readByIdController = { schema, handler };
