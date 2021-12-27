import { tasksService } from '../task.service.js';
import { TaskSchemaID, TaskSchemaRef } from '../task.schema.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { ApiEndpointTag } from '../../../common/constants.js';
import { makeUuidRequestParams } from '../../../common/request.js';

export const createController = ($boardId) => ({
  schema: {
    summary: 'Create new task',
    description: 'Creates a new task',
    tags: [ApiEndpointTag.TASKS],
    params: {
      ...makeUuidRequestParams([$boardId]),
    },
    body: TaskSchemaRef.CREATE,
    response: {
      ...makeSuccessfulResponse(
        TaskSchemaID.READ,
        HttpStatusCode.CREATED,
        'The task has been created.'
      ),
      ...HttpErrorResponse.BAD_REQUEST,
      ...HttpErrorResponse.UNAUTHORIZED,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const boardId = request.params[$boardId];
    const taskDto = request.body;
    const task = await tasksService.create(boardId, taskDto);
    reply.code(201).send(task);
  },
});
