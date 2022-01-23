import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { BoardsService } from '../board.service';
import { IBoardRequest, PARAM_BOARD_ID } from './board-types';

const schema: FastifySchema = {
  summary: 'Update board',
  description: 'Updates a board by ID',
  tags: [OpenApiEndpointTag.BOARDS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID]),
  body: S.ref(BoardSchemaID.UPDATE),
  response: {
    ...makeOpenApiHttpResponse(
      BoardSchemaID.READ,
      'The board has been updated.',
      HttpStatusCode.OK
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
  ...SECURITY_SCHEMA,
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
  const maybeBoard = await BoardsService.update(boardId, boardDto);
  if (!maybeBoard) {
    reply.notFound(`Board with id [${boardId}] not found!`);
  } else {
    reply.send(maybeBoard);
  }
};

export const updateByIdController = { schema, handler };
