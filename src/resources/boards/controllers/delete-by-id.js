import { boardsService } from '../board.service.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulEmptyResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const deleteByIdController = ($boardId) => ({
  schema: {
    summary: 'Delete board',
    description:
      'Deletes a board by ID.\n When somebody DELETE Board,\n all its Tasks should be deleted as well',
    tags: [ApiEndpointTag.BOARDS],
    params: { ...makeUuidRequestParams([$boardId]) },
    response: {
      ...makeSuccessfulEmptyResponse(
        HttpStatusCode.NO_CONTENT,
        'The board has been deleted'
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
    const success = await boardsService.deleteById(boardId);
    if (!success) {
      reply.notFound(`Board with id [${boardId}] not found!`);
    } else {
      reply.code(204).send();
    }
  },
});
