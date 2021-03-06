import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { UsersService } from '../user.service';
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
  ...SECURITY_SCHEMA,
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
  const maybeUser = await UsersService.update(userId, userDto);
  if (!maybeUser) {
    reply.notFound(`User with id [${userId}] not found!`);
  } else {
    reply.send(maybeUser);
  }
};

export const updateByIdController = { schema, handler };
