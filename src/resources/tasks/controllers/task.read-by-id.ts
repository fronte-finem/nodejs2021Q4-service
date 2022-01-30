import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { TasksService } from '../task.service';
import { ITaskRequest, PARAM_BOARD_ID, PARAM_TASK_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Get Task by boardId and taskId',
  description:
    "Gets the Task by the Board's and task ID\n (e.g. “/board/1/tasks/123”)",
  tags: [OpenApiEndpointTag.TASKS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID, PARAM_TASK_ID]),
  response: {
    ...makeOpenApiHttpResponse(TaskSchemaID.READ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
  ...SECURITY_SCHEMA,
};

/**
 * Handler for http-method GET on route "boards/:boardId/tasks/:taskId"
 * @param request - instance of {@link FastifyRequest}
 * @param reply - instance of {@link FastifyReply}
 * @returns empty promise
 */
const handler: RouteHandler<Omit<ITaskRequest, 'Body'>> = async (
  request,
  reply
) => {
  const boardId = request.params[PARAM_BOARD_ID];
  const taskId = request.params[PARAM_TASK_ID];
  const maybeTask = await TasksService.read(boardId, taskId);
  if (!maybeTask) {
    reply.notFound(`Task with id [${taskId}] not found!`);
  } else {
    reply.send(maybeTask);
  }
};

export const readByIdController = {
  schema,
  handler,
};
