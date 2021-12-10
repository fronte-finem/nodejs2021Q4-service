import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { usersService } from '../user.service';
import { IUserRequest, PARAM_USER_ID } from './user-types';

const schema: FastifySchema = {
  summary: 'Update a user',
  description: 'Updates a user by ID',
  tags: [ApiEndpointTag.USERS],
  params: {
    ...makeUuidRequestParams([PARAM_USER_ID]),
  },
  body: S.ref(UserSchemaID.UPDATE),
  response: {
    ...makeHttpResponse(
      UserSchemaID.READ,
      'The user has been updated.',
      HttpStatusCode.OK
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

const handler: RouteHandler<IUserRequest> = async (request, reply) => {
  const userId = request.params[PARAM_USER_ID];
  const userDto = request.body;
  const maybeUser = await usersService.update(userId, userDto);
  if (!maybeUser) {
    reply.notFound(`User with id [${userId}] not found!`);
  } else {
    reply.send(maybeUser);
  }
};

export const updateByIdController = { schema, handler };
