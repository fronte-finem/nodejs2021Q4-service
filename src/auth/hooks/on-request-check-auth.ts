import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../auth-service';

const UNAUTHORIZED_MESSAGE = 'Access token is missing or invalid';
const AUTH_TYPE = 'Bearer ';

export const onRequestCheckAuth = async (
  { headers }: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
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
