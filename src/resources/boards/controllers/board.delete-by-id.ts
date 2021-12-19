import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeOpenAPIUuidRequestParams } from '~src/openaip/request';
import { makeOpenApiHttpResponseEmpty } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { boardsService } from '../board.service';
import { IBoardRequest, PARAM_BOARD_ID } from './board-types';

const schema: FastifySchema = {
  summary: 'Delete board',
  description:
    'Deletes a board by ID.\n When somebody DELETE Board,\n all its Tasks should be deleted as well',
  tags: [OpenApiEndpointTag.BOARDS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID]),
  response: {
    ...makeOpenApiHttpResponseEmpty(
      'The board has been deleted',
      HttpStatusCode.NO_CONTENT
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

/**
 * Handler for http-method DELETE on route "/boards/:boardId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
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
