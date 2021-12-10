import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponseEmpty } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { boardsService } from '../board.service';
import { IBoardRequest, PARAM_BOARD_ID } from './board-types';

const schema: FastifySchema = {
  summary: 'Delete board',
  description:
    'Deletes a board by ID.\n When somebody DELETE Board,\n all its Tasks should be deleted as well',
  tags: [ApiEndpointTag.BOARDS],
  params: { ...makeUuidRequestParams([PARAM_BOARD_ID]) },
  response: {
    ...makeHttpResponseEmpty(
      'The board has been deleted',
      HttpStatusCode.NO_CONTENT
    ),
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
  const success = await boardsService.delete(boardId);
  if (!success) {
    reply.notFound(`Board with id [${boardId}] not found!`);
  } else {
    reply.code(HttpStatusCode.NO_CONTENT).send();
  }
};

export const deleteByIdController = { schema, handler };
