import { DeleteResult, getRepository, Repository, UpdateResult } from 'typeorm';
import { Maybe } from '../../common/types';
import { TaskDTO } from '../dto-types';
import { Task } from './task.model';

/**
 * Service for work with {@link Task}s repository
 */
export class TasksService {
  private static get repo(): Repository<Task> {
    return getRepository(Task);
  }

  /**
   * Find all {@link Task} records by board-id
   * @param boardId - board identification string
   * @returns promise with array of {@link TaskDTO} records
   */
  public static async readAll(boardId: string): Promise<TaskDTO[]> {
    return this.repo.find({
      where: { boardId },
    });
  }

  /**
   * Find {@link Task} record by board-id and task-id
   * @param boardId - board identification string
   * @param id - task identification string
   * @returns promise with {@link Maybe} found {@link TaskDTO} record
   */
  public static async read(
    boardId: string,
    id: string
  ): Promise<Maybe<TaskDTO>> {
    return this.repo.findOne({
      where: { id, boardId },
    });
  }

  /**
   * Create and save {@link Task} record linked to {@link Board} by id
   * @param boardId - board identification string
   * @param taskDTO - input partial form of {@link TaskDTO}
   * @returns promise with {@link Maybe} created {@link TaskDTO} record
   */
  public static async create(
    boardId: string,
    taskDTO: Partial<TaskDTO>
  ): Promise<Maybe<TaskDTO>> {
    const task = this.repo.create({ ...taskDTO, boardId });
    await this.repo.insert(task);
    return task;
  }

  /**
   * Remove {@link Task} record by board-id and task-id
   * @param boardId - board identification string
   * @param id - task identification string
   * @returns promise with boolean answer about operation status
   */
  public static async delete(boardId: string, id: string): Promise<boolean> {
    const { affected }: DeleteResult = await this.repo.delete({ id, boardId });
    return Boolean(affected);
  }

  /**
   * Update and save {@link Task} record by string ID
   * @param boardId - board identification string
   * @param id - task identification string
   * @param taskDTO - input partial form of {@link TaskDTO}
   * @returns promise with {@link Maybe} updated {@link TaskDTO} record
   */
  public static async update(
    boardId: string,
    id: string,
    taskDTO: Partial<TaskDTO>
  ): Promise<Maybe<TaskDTO>> {
    const { affected }: UpdateResult = await this.repo.update(id, {
      ...taskDTO,
      boardId,
    });
    return affected ? this.read(boardId, id) : undefined;
  }
}
