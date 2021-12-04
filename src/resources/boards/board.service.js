import { boardsRepo } from './board.memory.repository.js';
import { Board } from './board.model.js';

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

  deleteById: (id) => boardsRepo.delete(id),

  updateById: async (id, dto) => {
    const board = new Board({ id, ...dto });
    const maybeBoard = await boardsRepo.update(id, board);
    return maybeBoard && Board.toResponse(maybeBoard);
  },
};
