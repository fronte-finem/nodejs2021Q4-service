import { Param, ParseUUIDPipe } from '@nestjs/common';

export enum RoutePrefix {
  USERS = 'users',
  BOARDS = 'boards',
  TASKS = 'boards',
}

const ID = 'id';
export const BY_ID = `:${ID}`;
export const Id = Param(ID, ParseUUIDPipe);

const BOARD_ID = 'boardId';
export const TASKS = `:${BOARD_ID}/tasks`;
export const TASK_BY_ID = `${TASKS}/${BY_ID}`;
export const BoardId = Param(BOARD_ID, ParseUUIDPipe);
