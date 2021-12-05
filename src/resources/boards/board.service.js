import { boardsRepo } from './board.memory.repository.js';
import { Board } from './board.model.js';
import { tasksService } from '../tasks/task.service.js';

export const boardsService = {
  getAll: async () => {
    const boards = await boardsRepo.getAll();
    return boards.map(Board.toResponse);
  },

  getById: async (id) => {
    const maybeBoard = await boardsRepo.getById(id);
    return maybeBoard && Board.toResponse(maybeBoard);
  },

  create: async (dto) => {
    const board = new Board(dto);
    await boardsRepo.create(board);
    return Board.toResponse(board);
  },

  deleteById: async (id) => {
    const deleted = await boardsRepo.delete(id);
    if (deleted) {
      await tasksService.deleteByBoardId(id);
    }
    return deleted;
  },

  updateById: async (id, dto) => {
    const board = new Board({ id, ...dto });
    const maybeBoard = await boardsRepo.update(id, board);
    return maybeBoard && Board.toResponse(maybeBoard);
  },
};
