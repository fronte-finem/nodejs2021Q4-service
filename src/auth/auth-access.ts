import { FastifyReply, FastifyRequest, onRequestHookHandler } from 'fastify';
import { AuthService } from './auth-service';

const UNAUTHORIZED_MESSAGE = 'Access token is missing or invalid';
const AUTH_TYPE = 'Bearer ';

export const authAccess =
  (routePrefixes: string[]): onRequestHookHandler =>
  async (
    { url, headers }: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    if (routePrefixes.every((prefix) => !url.startsWith(prefix))) {
      return;
    }

    const token = headers.authorization?.replace(AUTH_TYPE, '');
    if (!token) {
      reply.unauthorized(UNAUTHORIZED_MESSAGE);
      return;
    }

    const success = await AuthService.verify(token);
    if (!success) {
      reply.unauthorized(UNAUTHORIZED_MESSAGE);
    }
  };
