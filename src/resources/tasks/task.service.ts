import { IDBRepository } from '~src/common/memory-repository';
import { Maybe } from '~src/types/common';
import { tasksRepo } from './task.memory.repository';
import { Task, TaskDTO } from './task.model';

class TasksService {
  constructor(private readonly repo: IDBRepository<Task>) {}

  public async readAll($boardId: string): Promise<TaskDTO[]> {
    const tasks = await this.repo.read();
    return tasks.filter(({ boardId }) => boardId === $boardId);
  }

  public async read(
    $boardId: string,
    $taskId: string
  ): Promise<Maybe<TaskDTO>> {
    const maybeTask = await this.repo.read($taskId);
    return maybeTask?.boardId === $boardId ? maybeTask : undefined;
  }

  public async create(
    $boardId: string,
    taskDTO: Partial<TaskDTO>
  ): Promise<Maybe<TaskDTO>> {
    const task = new Task({ ...taskDTO, boardId: $boardId });
    return this.repo.create(task);
  }

  public async delete($boardId: string, $taskId: string): Promise<boolean> {
    const maybeTask = await this.read($boardId, $taskId);
    return Boolean(maybeTask) && tasksRepo.delete($taskId);
  }

  public async update(
    $boardId: string,
    $taskId: string,
    taskDTO: Partial<TaskDTO>
  ): Promise<Maybe<TaskDTO>> {
    let maybeTask = await this.read($boardId, $taskId);
    if (!maybeTask) return undefined;
    maybeTask = new Task({ ...maybeTask, ...taskDTO });
    return this.repo.update($taskId, maybeTask);
  }

  public async deleteByBoardId($boardId: string): Promise<void> {
    const tasks = await this.readAll($boardId);
    await Promise.all(tasks.map(({ id }) => this.repo.delete(id)));
  }

  public async unassignUser($userId: string): Promise<void> {
    let tasks = await this.repo.read();
    tasks = tasks
      .filter(({ userId }) => userId === $userId)
      .map(({ userId, ...taskFields }) => new Task(taskFields));
    await Promise.all(tasks.map((task) => tasksRepo.update(task.id, task)));
  }
}

export const tasksService = new TasksService(tasksRepo);
