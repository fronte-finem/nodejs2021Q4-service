import { BoardSchemaID, BoardSchemaRef } from '../board.schema.js';
import { boardsService } from '../board.service.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const updateByIdController = ($boardId) => ({
  schema: {
    summary: 'Update board',
    description: 'Updates a board by ID',
    tags: [ApiEndpointTag.BOARDS],
    params: {
      ...makeUuidRequestParams([$boardId]),
    },
    body: BoardSchemaRef.UPDATE,
    response: {
      ...makeSuccessfulResponse(
        BoardSchemaID.READ,
        HttpStatusCode.OK,
        'The board has been updated.'
      ),
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
    const boardDto = request.body;
    const maybeBoard = await boardsService.update(boardId, boardDto);
    if (!maybeBoard) {
      reply.notFound(`Board with id [${boardId}] not found!`);
    } else {
      reply.send(maybeBoard);
    }
  },
});
