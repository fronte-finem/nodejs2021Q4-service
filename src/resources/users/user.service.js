import { usersRepo } from './user.memory.repository.js';
import { User } from './user.model.js';

export const usersService = {
  getAll: async () => {
    const users = await usersRepo.getAll();
    return users.map(User.toResponse);
  },

  getById: async (id) => {
    const maybeUser = await usersRepo.getById(id);
    return maybeUser && User.toResponse(maybeUser);
  },

  create: async (dto) => {
    const user = new User(dto);
    await usersRepo.create(user);
    return User.toResponse(user);
  },

  deleteById: (id) => usersRepo.delete(id),

  updateById: async (id, dto) => {
    const user = new User({ id, ...dto });
    const maybeUser = await usersRepo.update(id, user);
    return maybeUser && User.toResponse(maybeUser);
  },
};
