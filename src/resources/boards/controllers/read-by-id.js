import { BoardSchemaID } from '../board.schema.js';
import { boardsService } from '../board.service.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const readByIdController = ($boardId) => ({
  schema: {
    summary: 'Get board by ID',
    description: 'Gets a board by ID (e.g. “/boards/123”)',
    tags: [ApiEndpointTag.BOARDS],
    params: {
      ...makeUuidRequestParams([$boardId]),
    },
    response: {
      ...makeSuccessfulResponse(BoardSchemaID.READ),
      ...HttpErrorResponse.BAD_REQUEST,
      ...HttpErrorResponse.UNAUTHORIZED,
      ...HttpErrorResponse.NOT_FOUND,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const boardId = request.params[$boardId];
    const maybeBoard = await boardsService.getById(boardId);
    if (!maybeBoard) {
      reply.notFound(`Board with id [${boardId}] not found!`);
    } else {
      reply.send(maybeBoard);
    }
  },
});
