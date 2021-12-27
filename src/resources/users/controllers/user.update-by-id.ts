import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { OpenApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeOpenAPIUuidRequestParams } from '~src/openaip/request';
import { makeOpenApiHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { usersService } from '../user.service';
import { IUserRequest, PARAM_USER_ID } from './user-types';

const schema: FastifySchema = {
  summary: 'Update a user',
  description: 'Updates a user by ID',
  tags: [OpenApiEndpointTag.USERS],
  params: makeOpenAPIUuidRequestParams([PARAM_USER_ID]),
  body: S.ref(UserSchemaID.UPDATE),
  response: {
    ...makeOpenApiHttpResponse(
      UserSchemaID.READ,
      'The user has been updated.',
      HttpStatusCode.OK
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

/**
 * Handler for http-method PUT on route "/users/:userId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
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
