import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { makeHttpResponseArray } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { boardsService } from '../board.service';

const schema: FastifySchema = {
  summary: 'Get all boards',
  description: 'Returns all boards',
  tags: [ApiEndpointTag.BOARDS],
  response: {
    ...makeHttpResponseArray(BoardSchemaID.READ),
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

const handler: RouteHandler = async (request, reply) => {
  const boards = await boardsService.readAll();
  reply.send(boards);
};

export const readController = { schema, handler };
