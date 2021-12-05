import { tasksRepo } from './task.memory.repository.js';
import { Task } from './task.model.js';

export const tasksService = {
  readAll: async ($boardId) => {
    let tasks = await tasksRepo.read();
    tasks = tasks.filter(({ boardId }) => boardId === $boardId);
    return tasks.map(Task.toResponse);
  },

  read: async ($boardId, $taskId) => {
    const maybeTask = await tasksRepo.read($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) return undefined;
    return Task.toResponse(maybeTask);
  },

  create: async ($boardId, dto) => {
    const task = new Task({ ...dto, boardId: $boardId });
    await tasksRepo.create(task);
    return Task.toResponse(task);
  },

  delete: async ($boardId, $taskId) => {
    const maybeTask = await tasksService.read($boardId, $taskId);
    return maybeTask && tasksRepo.delete($taskId);
  },

  update: async ($boardId, $taskId, dto) => {
    let maybeTask = await tasksRepo.read($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) return undefined;
    maybeTask = new Task({ ...maybeTask, ...dto });
    maybeTask = await tasksRepo.update($taskId, maybeTask);
    return maybeTask && Task.toResponse(maybeTask);
  },

  deleteByBoardId: async ($boardId) => {
    const tasks = await tasksService.readAll($boardId);
    await Promise.all(tasks.map(({ id }) => tasksRepo.delete(id)));
  },

  unassignUser: async ($userId) => {
    let tasks = await tasksRepo.read();
    tasks = tasks
      .filter(({ userId }) => userId === $userId)
      .map(({ userId, ...taskFields }) => new Task(taskFields));
    await Promise.all(tasks.map((task) => tasksRepo.update(task.id, task)));
  },
};
