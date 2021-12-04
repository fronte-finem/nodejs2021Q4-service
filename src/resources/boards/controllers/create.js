import { boardsService } from '../board.service.js';
import { BoardSchemaID, BoardSchemaRef } from '../board.schema.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const createController = () => ({
  schema: {
    summary: 'Create board',
    description: 'Creates a new board (remove password from response)',
    tags: [ApiEndpointTag.BOARDS],
    body: BoardSchemaRef.CREATE,
    response: {
      ...makeSuccessfulResponse(
        BoardSchemaID.READ,
        HttpStatusCode.CREATED,
        'The board has been created.'
      ),
      ...HttpErrorResponse.BAD_REQUEST,
      ...HttpErrorResponse.UNAUTHORIZED,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const boardDto = request.body;
    const board = await boardsService.create(boardDto);
    reply.code(201).send(board);
  },
});
