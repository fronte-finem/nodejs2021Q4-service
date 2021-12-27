import { boardsRepo } from './board.memory.repository.js';
import { Board } from './board.model.js';
import { tasksService } from '../tasks/task.service.js';

export const boardsService = {
  readAll: async () => {
    const boards = await boardsRepo.read();
    return boards.map(Board.toResponse);
  },

  read: async (id) => {
    const maybeBoard = await boardsRepo.read(id);
    return maybeBoard && Board.toResponse(maybeBoard);
  },

  create: async (dto) => {
    const board = new Board(dto);
    await boardsRepo.create(board);
    return Board.toResponse(board);
  },

  delete: async (id) => {
    const deleted = await boardsRepo.delete(id);
    if (deleted) {
      await tasksService.deleteByBoardId(id);
    }
    return deleted;
  },

  update: async (id, dto) => {
    const board = new Board({ id, ...dto });
    const maybeBoard = await boardsRepo.update(id, board);
    return maybeBoard && Board.toResponse(maybeBoard);
  },
};
