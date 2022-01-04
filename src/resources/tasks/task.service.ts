import { IDBRepository } from '../../common/memory-repository';
import { Maybe } from '../../common/types';
import { tasksRepo } from './task.memory.repository';
import { Task, TaskDTO } from './task.model';

/**
 * Service for work with {@link Task}s repository
 */
class TasksService {
  /**
   * Build service with injected repository
   * @param repo - instance of repository for {@link Task} records
   * @returns instance of {@link TasksService}
   */
  constructor(private readonly repo: IDBRepository<Task>) {}

  /**
   * Find all {@link Task} records by board-id
   * @param $boardId - board identification string
   * @returns promise with array of {@link TaskDTO} records
   */
  public async readAll($boardId: string): Promise<TaskDTO[]> {
    const tasks = await this.repo.read();
    return tasks.filter(({ boardId }) => boardId === $boardId);
  }

  /**
   * Find {@link Task} record by board-id and task-id
   * @param $boardId - board identification string
   * @param $taskId - task identification string
   * @returns promise with {@link Maybe} found {@link TaskDTO} record
   */
  public async read(
    $boardId: string,
    $taskId: string
  ): Promise<Maybe<TaskDTO>> {
    const maybeTask = await this.repo.read($taskId);
    return maybeTask?.boardId === $boardId ? maybeTask : undefined;
  }

  /**
   * Create and save {@link Task} record linked to {@link Board} by id
   * @param $boardId - board identification string
   * @param taskDTO - input partial form of {@link TaskDTO}
   * @returns promise with {@link Maybe} created {@link TaskDTO} record
   */
  public async create(
    $boardId: string,
    taskDTO: Partial<TaskDTO>
  ): Promise<Maybe<TaskDTO>> {
    const task = new Task({ ...taskDTO, boardId: $boardId });
    return this.repo.create(task);
  }

  /**
   * Remove {@link Task} record by board-id and task-id
   * @param $boardId - board identification string
   * @param $taskId - task identification string
   * @returns promise with boolean answer about operation status
   */
  public async delete($boardId: string, $taskId: string): Promise<boolean> {
    const maybeTask = await this.read($boardId, $taskId);
    return Boolean(maybeTask) && tasksRepo.delete($taskId);
  }

  /**
   * Update and save {@link Task} record by string ID
   * @param $boardId - board identification string
   * @param $taskId - task identification string
   * @param taskDTO - input partial form of {@link TaskDTO}
   * @returns promise with {@link Maybe} updated {@link TaskDTO} record
   */
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

  /**
   * Remove all {@link Task} records by board-id
   * @param $boardId - board identification string
   * @returns empty promise signaling end of operation
   */
  public async deleteByBoardId($boardId: string): Promise<void> {
    const tasks = await this.readAll($boardId);
    await Promise.all(tasks.map(({ id }) => this.repo.delete(id)));
  }

  /**
   * Update all {@link Task} records with same user-id by resetting this field
   * @param $userId - user identification string
   * @returns empty promise signaling end of operation
   */
  public async unassignUser($userId: string): Promise<void> {
    let tasks = await this.repo.read();
    tasks = tasks
      .filter(({ userId }) => userId === $userId)
      .map(({ userId, ...taskFields }) => new Task(taskFields));
    await Promise.all(tasks.map((task) => tasksRepo.update(task.id, task)));
  }
}

export const tasksService = new TasksService(tasksRepo);
