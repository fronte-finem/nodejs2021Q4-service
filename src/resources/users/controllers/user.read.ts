import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { makeHttpResponseArray } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { usersService } from '../user.service';

const schema: FastifySchema = {
  summary: 'Get all users',
  description: 'Gets all users (remove password from response)',
  tags: [ApiEndpointTag.USERS],
  response: {
    ...makeHttpResponseArray(UserSchemaID.READ),
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

const handler: RouteHandler = async (request, reply) => {
  const users = await usersService.readAll();
  reply.send(users);
};

export const readController = { schema, handler };
