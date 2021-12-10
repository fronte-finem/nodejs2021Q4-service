import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { boardsService } from '../board.service';
import { IBoardRequest, PARAM_BOARD_ID } from './board-types';

const schema: FastifySchema = {
  summary: 'Get board by ID',
  description: 'Gets a board by ID (e.g. “/boards/123”)',
  tags: [ApiEndpointTag.BOARDS],
  params: {
    ...makeUuidRequestParams([PARAM_BOARD_ID]),
  },
  response: {
    ...makeHttpResponse(BoardSchemaID.READ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

const handler: RouteHandler<Omit<IBoardRequest, 'Body'>> = async (
  request,
  reply
) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const maybeBoard = await boardsService.read(boardId);
  if (!maybeBoard) {
    reply.notFound(`Board with id [${boardId}] not found!`);
  } else {
    reply.send(maybeBoard);
  }
};

export const readByIdController = { schema, handler };
