import { usersRepo } from './user.memory.repository.js';
import { User } from './user.model.js';
import { tasksService } from '../tasks/task.service.js';

export const usersService = {
  readAll: async () => {
    const users = await usersRepo.read();
    return users.map(User.toResponse);
  },

  read: async (id) => {
    const maybeUser = await usersRepo.read(id);
    return maybeUser && User.toResponse(maybeUser);
  },

  create: async (dto) => {
    const user = new User(dto);
    await usersRepo.create(user);
    return User.toResponse(user);
  },

  delete: async (id) => {
    const deleted = await usersRepo.delete(id);
    if (deleted) {
      await tasksService.unassignUser(id);
    }
    return deleted;
  },

  update: async (id, dto) => {
    const user = new User({ id, ...dto });
    const maybeUser = await usersRepo.update(id, user);
    return maybeUser && User.toResponse(maybeUser);
  },
};
