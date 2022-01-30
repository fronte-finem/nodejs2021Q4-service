import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenApiHttpResponseArray } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { UsersService } from '../user.service';

const schema: FastifySchema = {
  summary: 'Get all users',
  description: 'Gets all users (remove password from response)',
  tags: [OpenApiEndpointTag.USERS],
  response: {
    ...makeOpenApiHttpResponseArray(UserSchemaID.READ),
    ...HttpErrorResponse.UNAUTHORIZED,
  },
  ...SECURITY_SCHEMA,
};

/**
 * Handler for http-method GET on route "/users"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler = async (request, reply) => {
  const users = await UsersService.readAll();
  reply.send(users);
};

export const readController = { schema, handler };
