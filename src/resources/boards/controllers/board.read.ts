import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '~src/common/constants';
import { makeOpenApiHttpResponseArray } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { boardsService } from '../board.service';

const schema: FastifySchema = {
  summary: 'Get all boards',
  description: 'Returns all boards',
  tags: [OpenApiEndpointTag.BOARDS],
  response: {
    ...makeOpenApiHttpResponseArray(BoardSchemaID.READ),
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

/**
 * Handler for http-method GET on route "/boards"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler = async (request, reply) => {
  const boards = await boardsService.readAll();
  reply.send(boards);
};

export const readController = { schema, handler };
