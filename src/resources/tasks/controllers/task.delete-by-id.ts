import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponseEmpty } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { tasksService } from '../task.service';
import { ITaskRequest, PARAM_BOARD_ID, PARAM_TASK_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Delete task',
  description:
    "Deletes Task by the Board's and task ID\n (e.g. “/board/1/tasks/123”)",
  tags: [ApiEndpointTag.TASKS],
  params: { ...makeUuidRequestParams([PARAM_BOARD_ID, PARAM_TASK_ID]) },
  response: {
    ...makeHttpResponseEmpty(
      'The task has been deleted',
      HttpStatusCode.NO_CONTENT
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

const handler: RouteHandler<Omit<ITaskRequest, 'Body'>> = async (
  request,
  reply
) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const taskId = request.params[PARAM_TASK_ID];
  const success = await tasksService.delete(boardId, taskId);
  if (!success) {
    reply.notFound(`Task with id [${taskId}] not found!`);
  } else {
    reply.code(HttpStatusCode.NO_CONTENT).send();
  }
};

export const deleteByIdController = { schema, handler };
