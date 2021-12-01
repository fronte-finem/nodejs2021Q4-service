import { usersRepo } from './user.memory.repository.js';
import { User } from './user.model.js';

export const usersService = {
  getAll: () => usersRepo.getAll(),

  getById: (id) => usersRepo.getById(id),

  create: async (dto) => {
    const user = new User(dto);
    await usersRepo.create(user);
    return User.toResponse(user);
  },
};
