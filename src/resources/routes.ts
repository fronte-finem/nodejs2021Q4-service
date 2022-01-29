import { Param, ParseUUIDPipe } from '@nestjs/common';

const ID = 'id';
export const Id = Param(ID, ParseUUIDPipe);

const BOARD_ID = 'boardId';
export const BoardId = Param(BOARD_ID, ParseUUIDPipe);

export const BY_ID = `:${ID}`;

export const RoutePrefix = {
  USERS: 'users',
  BOARDS: 'boards',
  COLUMNS: `boards/:${BOARD_ID}/columns`,
  TASKS: `boards/:${BOARD_ID}/tasks`,
};
