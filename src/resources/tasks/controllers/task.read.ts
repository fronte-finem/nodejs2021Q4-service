import { FastifySchema, RouteHandler } from 'fastify';
import { OpenApiEndpointTag } from '../../../common/constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponseArray } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { TasksService } from '../task.service';
import { ITaskRootRequest, PARAM_BOARD_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Get Tasks by boardId',
  description: 'Gets tasks by the Board ID\n (e.g. “/board/1/tasks”)',
  tags: [OpenApiEndpointTag.TASKS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID]),
  response: {
    ...makeOpenApiHttpResponseArray(TaskSchemaID.READ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
  ...SECURITY_SCHEMA,
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
  const tasks = await TasksService.readAll(boardId);
  reply.send(tasks);
};

export const readController = {
  schema,
  handler,
};
