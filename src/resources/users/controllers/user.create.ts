import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { UserSchemaID } from '../user.schema';
import { UsersService } from '../user.service';
import { IUserRequest } from './user-types';

const schema: FastifySchema = {
  summary: 'Create user',
  description: 'Creates a new user (remove password from response)',
  tags: [OpenApiEndpointTag.USERS],
  body: S.ref(UserSchemaID.CREATE),
  response: {
    ...makeOpenApiHttpResponse(
      UserSchemaID.READ,
      'The user has been created.',
      HttpStatusCode.CREATED
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

/**
 * Handler for http-method POST on route "/users"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<Omit<IUserRequest, 'Params'>> = async (
  request,
  reply
) => {
  const userDto = request.body;
  const user = await UsersService.create(userDto);
  reply.code(HttpStatusCode.CREATED).send(user);
};

export const createController = { schema, handler };
