import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { boardsService } from '../board.service';
import { IBoardRequest, PARAM_BOARD_ID } from './board-types';

const schema: FastifySchema = {
  summary: 'Update board',
  description: 'Updates a board by ID',
  tags: [ApiEndpointTag.BOARDS],
  params: {
    ...makeUuidRequestParams([PARAM_BOARD_ID]),
  },
  body: S.ref(BoardSchemaID.UPDATE),
  response: {
    ...makeHttpResponse(
      BoardSchemaID.READ,
      'The board has been updated.',
      HttpStatusCode.OK
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

/**
 * Handler for http-method PUT on route "/boards/:boardId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<IBoardRequest> = async (request, reply) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const boardDto = request.body;
  const maybeBoard = await boardsService.update(boardId, boardDto);
  if (!maybeBoard) {
    reply.notFound(`Board with id [${boardId}] not found!`);
  } else {
    reply.send(maybeBoard);
  }
};

export const updateByIdController = { schema, handler };
