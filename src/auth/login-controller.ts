import { FastifySchema, RequestGenericInterface, RouteHandler } from 'fastify';
import S, { ObjectSchema } from 'fluent-json-schema';
import { OpenApiEndpointTag } from '../common/constants';
import { makeOpenApiHttpResponse } from '../openaip/response';
import { HttpErrorResponse } from '../openaip/response.http-error';
import { UserSchemaID } from '../resources/users/user.schema';
import { AuthService } from './auth-service';
import { LoginDTO } from './types';

export interface ILoginRequest extends RequestGenericInterface {
  Body: LoginDTO;
}

export const LoginResponsePayloadSchemaId = 'LoginResponsePayload';

export const LoginResponsePayloadSchema: ObjectSchema = S.object()
  .id(LoginResponsePayloadSchemaId)
  .description('JWT Token')
  .prop('token', S.string());

const schema: FastifySchema = {
  summary: 'Login',
  description: 'Logins a user and returns a JWT-token',
  tags: [OpenApiEndpointTag.LOGIN],
  body: S.ref(UserSchemaID.LOGIN),
  response: {
    ...makeOpenApiHttpResponse(
      LoginResponsePayloadSchemaId,
      'Successful login.'
    ),
    ...HttpErrorResponse.FORBIDDEN,
    ...HttpErrorResponse.BAD_REQUEST,
  },
};

const handler: RouteHandler<ILoginRequest> = async (request, reply) => {
  const loginDto = request.body;
  const token = await AuthService.login(loginDto);
  if (!token) {
    reply.forbidden('Incorrect login or password!');
  } else {
    reply.send({ token });
  }
};

export const loginController = { schema, handler };
