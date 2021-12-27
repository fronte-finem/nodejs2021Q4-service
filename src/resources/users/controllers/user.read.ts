import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '~src/common/constants';
import { makeOpenApiHttpResponseArray } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { usersService } from '../user.service';

const schema: FastifySchema = {
  summary: 'Get all users',
  description: 'Gets all users (remove password from response)',
  tags: [OpenApiEndpointTag.USERS],
  response: {
    ...makeOpenApiHttpResponseArray(UserSchemaID.READ),
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

/**
 * Handler for http-method GET on route "/users"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler = async (request, reply) => {
  const users = await usersService.readAll();
  reply.send(users);
};

export const readController = { schema, handler };
