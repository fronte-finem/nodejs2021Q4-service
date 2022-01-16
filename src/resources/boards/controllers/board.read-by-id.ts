import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { BoardsService } from '../board.service';
import { IBoardRequest, PARAM_BOARD_ID } from './board-types';

const schema: FastifySchema = {
  summary: 'Get board by ID',
  description: 'Gets a board by ID (e.g. “/boards/123”)',
  tags: [OpenApiEndpointTag.BOARDS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID]),
  response: {
    ...makeOpenApiHttpResponse(BoardSchemaID.READ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

/**
 * Handler for http-method GET on route "/boards/:boardId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<Omit<IBoardRequest, 'Body'>> = async (
  request,
  reply
) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const maybeBoard = await BoardsService.read(boardId);
  if (!maybeBoard) {
    reply.notFound(`Board with id [${boardId}] not found!`);
  } else {
    reply.send(maybeBoard);
  }
};

export const readByIdController = { schema, handler };
