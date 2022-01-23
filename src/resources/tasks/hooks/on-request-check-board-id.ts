import { FastifyReply, FastifyRequest } from 'fastify';
import { BoardsService } from '../../boards/board.service';
import {
  IBoardRequest,
  PARAM_BOARD_ID,
} from '../../boards/controllers/board-types';

type IRequest = Omit<IBoardRequest, 'Body'>;

export const onRequestCheckBoardId = async (
  request: FastifyRequest<IRequest>,
  reply: FastifyReply
): Promise<void> => {
  const boardId = request.params[PARAM_BOARD_ID];
  const maybeBoard = await BoardsService.check(boardId);
  if (!maybeBoard) {
    reply.notFound(`Board with id [${boardId}] not found!`);
  }
};
