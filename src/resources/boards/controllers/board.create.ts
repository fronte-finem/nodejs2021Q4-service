import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { boardsService } from '../board.service';
import { IBoardRequest } from './board-types';

const schema: FastifySchema = {
  summary: 'Create board',
  description: 'Creates a new board',
  tags: [ApiEndpointTag.BOARDS],
  body: S.ref(BoardSchemaID.CREATE),
  response: {
    ...makeHttpResponse(
      BoardSchemaID.READ,
      'The board has been created.',
      HttpStatusCode.CREATED
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

/**
 * Handler for http-method POST on route "/boards"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<Omit<IBoardRequest, 'Params'>> = async (
  request,
  reply
) => {
  const boardDto = request.body;
  const board = await boardsService.create(boardDto);
  reply.code(201).send(board);
};

export const createController = { schema, handler };
