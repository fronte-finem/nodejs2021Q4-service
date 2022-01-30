import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { BoardSchemaID } from '../board.schema';
import { BoardsService } from '../board.service';
import { IBoardRequest } from './board-types';

const schema: FastifySchema = {
  summary: 'Create board',
  description: 'Creates a new board',
  tags: [OpenApiEndpointTag.BOARDS],
  body: S.ref(BoardSchemaID.CREATE),
  response: {
    ...makeOpenApiHttpResponse(
      BoardSchemaID.READ,
      'The board has been created.',
      HttpStatusCode.CREATED
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
  ...SECURITY_SCHEMA,
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
  const board = await BoardsService.create(boardDto);
  reply.code(201).send(board);
};

export const createController = { schema, handler };
