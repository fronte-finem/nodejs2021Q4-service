import { tasksRepo } from './task.memory.repository.js';
import { Task } from './task.model.js';

export const tasksService = {
  getAll: async ($boardId) => {
    const tasks = await tasksRepo.getAll({ $boardId });
    return tasks.map(Task.toResponse);
  },

  getById: async ($boardId, $taskId) => {
    const maybeTask = await tasksRepo.getById($boardId, $taskId);
    return maybeTask && Task.toResponse(maybeTask);
  },

  create: async ($boardId, dto) => {
    const task = new Task({ ...dto, boardId: $boardId });
    await tasksRepo.create(task);
    return Task.toResponse(task);
  },

  deleteById: ($boardId, $taskId) => tasksRepo.delete($boardId, $taskId),

  deleteByBoardId: ($boardId) => tasksRepo.deleteByBoard($boardId),

  updateById: async ($boardId, $taskId, dto) => {
    const task = new Task({ ...dto, id: $taskId, boardId: $boardId });
    const maybeTask = await tasksRepo.updateByBoardId($boardId, $taskId, task);
    return maybeTask && Task.toResponse(maybeTask);
  },

  unassignUser: async ($userId) => {
    const tasks = await tasksRepo.getAll({ $userId });
    await Promise.all(
      tasks.map(({ userId, ...taskFields }) =>
        tasksRepo.update(new Task(taskFields))
      )
    );
  },
};
