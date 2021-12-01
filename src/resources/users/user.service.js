import { usersRepo } from './user.memory.repository.js';

export const usersService = {
  getAll: () => usersRepo.getAll(),
};
