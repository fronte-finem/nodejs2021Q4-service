import { TaskSchemaID } from '../task.schema.js';
import { tasksService } from '../task.service.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const readByIdController = ($boardId, $taskId) => ({
  schema: {
    summary: 'Get Task by boardId and taskId',
    description:
      "Gets the Task by the Board's and task ID\n (e.g. “/board/1/tasks/123”)",
    tags: [ApiEndpointTag.TASKS],
    params: {
      ...makeUuidRequestParams([$boardId, $taskId]),
    },
    response: {
      ...makeSuccessfulResponse(TaskSchemaID.READ),
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
    const maybeTask = await tasksService.read(boardId, taskId);
    if (!maybeTask) {
      reply.notFound(`Task with id [${taskId}] not found!`);
    } else {
      reply.send(maybeTask);
    }
  },
});
