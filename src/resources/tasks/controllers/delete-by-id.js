import { tasksService } from '../task.service.js';
import { HttpStatusCode } from '../../../common/http-constants.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulEmptyResponse } from '../../../common/response.js';
import { makeUuidRequestParams } from '../../../common/request.js';
import { ApiEndpointTag } from '../../../common/constants.js';

export const deleteByIdController = ($boardId, $taskId) => ({
  schema: {
    summary: 'Delete task',
    description:
      'Deletes task by ID. When somebody\n DELETE Task, all Tasks where Task is assignee\n should be updated to put taskId = null',
    tags: [ApiEndpointTag.TASKS],
    params: { ...makeUuidRequestParams([$boardId, $taskId]) },
    response: {
      ...makeSuccessfulEmptyResponse(
        HttpStatusCode.NO_CONTENT,
        'The task has been deleted'
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
    const success = await tasksService.deleteById(boardId, taskId);
    if (!success) {
      reply.notFound(`Task with id [${taskId}] not found!`);
    } else {
      reply.code(204).send();
    }
  },
});
