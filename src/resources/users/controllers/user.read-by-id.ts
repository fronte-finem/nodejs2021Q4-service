import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { usersService } from '../user.service';
import { IUserRequest, PARAM_USER_ID } from './user-types';

const schema: FastifySchema = {
  summary: 'Get user by ID',
  description:
    'Gets a user by ID\n e.g. “/users/123” (remove password from response)',
  tags: [OpenApiEndpointTag.USERS],
  params: makeOpenAPIUuidRequestParams([PARAM_USER_ID]),
  response: {
    ...makeOpenApiHttpResponse(UserSchemaID.READ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

/**
 * Handler for http-method GET on route "/users/:userId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
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
