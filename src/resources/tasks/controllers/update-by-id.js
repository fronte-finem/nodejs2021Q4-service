import { TaskSchemaID, TaskSchemaRef } from '../task.schema.js';
import { tasksService } from '../task.service.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const updateByIdController = ($boardId, $taskId) => ({
  schema: {
    summary: 'Update a task',
    description: 'Updates a task by ID',
    tags: [ApiEndpointTag.TASKS],
    params: {
      ...makeUuidRequestParams([$boardId, $taskId]),
    },
    body: TaskSchemaRef.UPDATE,
    response: {
      ...makeSuccessfulResponse(
        TaskSchemaID.READ,
        HttpStatusCode.OK,
        'The task has been updated.'
      ),
      ...HttpErrorResponse.BAD_REQUEST,
      ...HttpErrorResponse.UNAUTHORIZED,
      ...HttpErrorResponse.NOT_FOUND,
    },
  },
  /**
   * @param { FastifyRequest } request
   * @param { FastifyReply } reply
   * @return { Promise<void> }
   */
  async handler(request, reply) {
    const boardId = request.params[$boardId];
    const taskId = request.params[$taskId];
    const taskDto = request.body;
    const maybeTask = await tasksService.updateById(boardId, taskId, taskDto);
    if (!maybeTask) {
      reply.notFound(`Task with id [${taskId}] not found!`);
    } else {
      reply.send(maybeTask);
    }
  },
});
