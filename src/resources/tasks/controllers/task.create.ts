import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { tasksService } from '../task.service';
import { ITaskRootRequest, PARAM_BOARD_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Create new task',
  description: 'Creates a new task',
  tags: [ApiEndpointTag.TASKS],
  params: {
    ...makeUuidRequestParams([PARAM_BOARD_ID]),
  },
  body: S.ref(TaskSchemaID.CREATE),
  response: {
    ...makeHttpResponse(
      TaskSchemaID.READ,
      'The task has been created.',
      HttpStatusCode.CREATED
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

/**
 * Handler for http-method POST on route "/boards/:boardId/tasks"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<ITaskRootRequest> = async (request, reply) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const taskDto = request.body;
  const task = await tasksService.create(boardId, taskDto);
  reply.code(HttpStatusCode.CREATED).send(task);
};

export const createController = { schema, handler };
