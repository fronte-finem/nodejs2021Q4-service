import { FastifySchema, RouteHandler } from 'fastify';
import { ApiEndpointTag } from '~src/common/constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { tasksService } from '../task.service';
import { ITaskRequest, PARAM_BOARD_ID, PARAM_TASK_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Get Task by boardId and taskId',
  description:
    "Gets the Task by the Board's and task ID\n (e.g. “/board/1/tasks/123”)",
  tags: [ApiEndpointTag.TASKS],
  params: {
    ...makeUuidRequestParams([PARAM_BOARD_ID, PARAM_TASK_ID]),
  },
  response: {
    ...makeHttpResponse(TaskSchemaID.READ),
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
  const maybeTask = await tasksService.read(boardId, taskId);
  if (!maybeTask) {
    reply.notFound(`Task with id [${taskId}] not found!`);
  } else {
    reply.send(maybeTask);
  }
};

export const readByIdController = { schema, handler };
