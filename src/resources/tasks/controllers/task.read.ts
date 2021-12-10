import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponseArray } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { tasksService } from '../task.service';
import { ITaskRootRequest, PARAM_BOARD_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Get Tasks by boardId',
  description: 'Gets tasks by the Board ID\n (e.g. “/board/1/tasks”)',
  tags: [ApiEndpointTag.TASKS],
  params: {
    ...makeUuidRequestParams([PARAM_BOARD_ID]),
  },
  response: {
    ...makeHttpResponseArray(TaskSchemaID.READ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
};

/**
 * Handler for http-method GET on route "/boards/:boardId/tasks"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<Omit<ITaskRootRequest, 'Body'>> = async (
  request,
  reply
) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const tasks = await tasksService.readAll(boardId);
  reply.send(tasks);
};

export const readController = { schema, handler };
