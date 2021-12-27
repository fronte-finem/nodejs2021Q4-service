import { boardsService } from '../board.service.js';
import { BoardSchemaID } from '../board.schema.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulArrayResponse } from '../../../common/response.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const readController = () => ({
  schema: {
    summary: 'Get all boards',
    description: 'Returns all boards',
    tags: [ApiEndpointTag.BOARDS],
    response: {
      ...makeSuccessfulArrayResponse(BoardSchemaID.READ),
      ...HttpErrorResponse.UNAUTHORIZED,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const boards = await boardsService.readAll();
    reply.send(boards);
  },
});
