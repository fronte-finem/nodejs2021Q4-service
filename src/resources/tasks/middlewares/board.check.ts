import { FastifyReply, FastifyRequest } from 'fastify';
import { boardsService } from '~src/resources/boards/board.service';
import {
  ITaskRequest,
  ITaskRootRequest,
  PARAM_BOARD_ID,
} from '../controllers/task-types';

type IRequest = Omit<ITaskRootRequest | ITaskRequest, 'Body'>;

export type TaskRouteHandler<T extends IRequest> = (
  request: FastifyRequest<T>,
  reply: FastifyReply
) => Promise<void>;

/**
 * Decorator that checks if Board with :boardId from URL-params exists in repository
 * @param handler - route-handler function {@link TaskRouteHandler}
 * @returns wrapped route-handler function {@link TaskRouteHandler}
 */
export const useBoardMiddleware =
  <T extends IRequest>(handler: TaskRouteHandler<T>): TaskRouteHandler<T> =>
  /**
   * Wrapper handler
   * @param request - instance of {@link FastifyRequest}
   * @param reply - instance of {@link FastifyReply}
   * @returns empty promise
   */
  async (request: FastifyRequest<T>, reply: FastifyReply): Promise<void> => {
    const boardId = request.params[PARAM_BOARD_ID];
    const maybeBoard = await boardsService.read(boardId);
    if (!maybeBoard) {
      reply.notFound(`Board with id [${boardId}] not found!`);
    } else {
      await handler(request, reply);
    }
  };
