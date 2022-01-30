import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponseEmpty } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { TasksService } from '../task.service';
import { ITaskRequest, PARAM_BOARD_ID, PARAM_TASK_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Delete task',
  description:
    "Deletes Task by the Board's and task ID\n (e.g. “/board/1/tasks/123”)",
  tags: [OpenApiEndpointTag.TASKS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID, PARAM_TASK_ID]),
  response: {
    ...makeOpenApiHttpResponseEmpty(
      'The task has been deleted',
      HttpStatusCode.NO_CONTENT
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
    ...HttpErrorResponse.NOT_FOUND,
  },
  ...SECURITY_SCHEMA,
};

/**
 * Handler for http-method DELETE on route "/boards/:boardId/tasks/:taskId"
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
  const success = await TasksService.delete(boardId, taskId);
  if (!success) {
    reply.notFound(`Task with id [${taskId}] not found!`);
  } else {
    reply.code(HttpStatusCode.NO_CONTENT).send();
  }
};

export const deleteByIdController = {
  schema,
  handler,
};
