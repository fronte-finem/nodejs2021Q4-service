import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { ApiEndpointTag } from '~src/common/constants';
import { HttpStatusCode } from '~src/common/http-constants';
import { makeUuidRequestParams } from '~src/openaip/request';
import { makeHttpResponse } from '~src/openaip/response';
import { HttpErrorResponse } from '~src/openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { tasksService } from '../task.service';
import { ITaskRequest, PARAM_BOARD_ID, PARAM_TASK_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Update a task',
  description:
    "Updates a task by the Board's and task ID\n (e.g. “/board/1/tasks/123”)",
  tags: [ApiEndpointTag.TASKS],
  params: {
    ...makeUuidRequestParams([PARAM_BOARD_ID, PARAM_TASK_ID]),
  },
  body: S.ref(TaskSchemaID.UPDATE),
  response: {
    ...makeHttpResponse(
      TaskSchemaID.READ,
      'The task has been updated.',
      HttpStatusCode.OK
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
};

const handler: RouteHandler<ITaskRequest> = async (request, reply) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const taskId = request.params[PARAM_TASK_ID];
  const taskDto = request.body;
  const maybeTask = await tasksService.update(boardId, taskId, taskDto);
  if (!maybeTask) {
    reply.notFound(`Task with id [${taskId}] not found!`);
  } else {
    reply.send(maybeTask);
  }
};

export const updateByIdController = { schema, handler };
