import { FastifySchema, RouteHandler } from 'fastify';
import S from 'fluent-json-schema';
import { OpenApiEndpointTag } from '../../../common/constants';
import { HttpStatusCode } from '../../../common/http-constants';
import { SECURITY_SCHEMA } from '../../../openaip/constants';
import { makeOpenAPIUuidRequestParams } from '../../../openaip/request';
import { makeOpenApiHttpResponse } from '../../../openaip/response';
import { HttpErrorResponse } from '../../../openaip/response.http-error';
import { TaskSchemaID } from '../task.schema';
import { TasksService } from '../task.service';
import { ITaskRootRequest, PARAM_BOARD_ID } from './task-types';

const schema: FastifySchema = {
  summary: 'Create new task',
  description: 'Creates a new task',
  tags: [OpenApiEndpointTag.TASKS],
  params: makeOpenAPIUuidRequestParams([PARAM_BOARD_ID]),
  body: S.ref(TaskSchemaID.CREATE),
  response: {
    ...makeOpenApiHttpResponse(
      TaskSchemaID.READ,
      'The task has been created.',
      HttpStatusCode.CREATED
    ),
    ...HttpErrorResponse.BAD_REQUEST,
    ...HttpErrorResponse.UNAUTHORIZED,
  },
  ...SECURITY_SCHEMA,
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
  const task = await TasksService.create(boardId, taskDto);
  reply.code(HttpStatusCode.CREATED).send(task);
};

export const createController = {
  schema,
  handler,
};
