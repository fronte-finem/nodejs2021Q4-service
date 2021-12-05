import { tasksService } from '../task.service.js';
import { TaskSchemaID } from '../task.schema.js';
import { HttpErrorResponse } from '../../../common/http-error.schema.js';
import { makeSuccessfulArrayResponse } from '../../../common/response.js';
import { ApiEndpointTag } from '../../../common/constants.js';
import { makeUuidRequestParams } from '../../../common/request.js';

export const readController = ($boardId) => ({
  schema: {
    summary: 'Get Tasks by boardId',
    description: 'Gets tasks by the Board ID\n (e.g. “/board/1/tasks”)',
    tags: [ApiEndpointTag.TASKS],
    params: {
      ...makeUuidRequestParams([$boardId]),
    },
    response: {
      ...makeSuccessfulArrayResponse(TaskSchemaID.READ),
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
    const tasks = await tasksService.getAll(boardId);
    reply.send(tasks);
  },
});
