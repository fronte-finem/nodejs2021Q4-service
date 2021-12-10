import { RequestGenericInterface } from 'fastify';
import { BoardDTO } from '../board.model';

export const PARAM_BOARD_ID = 'boardId';

export interface IBoardRequest extends RequestGenericInterface {
  Params: {
    [PARAM_BOARD_ID]: string;
  };
  Body: Partial<BoardDTO>;
}
