import { BaseModel, RecordWithId } from '~src/common/types';

export interface TaskDTO extends RecordWithId {
  readonly title: string;
  readonly order: number;
  readonly description: string;
  readonly userId: null | string;
  readonly boardId: null | string;
  readonly columnId: null | string;
}

/**
 * Model for task record
 */
export class Task extends BaseModel implements TaskDTO {
  public readonly title: string;
  public readonly order: number;
  public readonly description: string;
  public readonly userId: string | null;
  public readonly boardId: string | null;
  public readonly columnId: string | null;

  /**
   * Create task record
   * @param taskDTO - partial form of {@link TaskDTO}
   * @returns instance of {@link Task}
   */
  constructor(taskDTO: Partial<TaskDTO> = {}) {
    super(taskDTO.id);
    this.title = taskDTO.title ?? 'Test Task';
    this.order = taskDTO.order ?? 1;
    this.description = taskDTO.description ?? 'Lorem ipsum';
    this.userId = taskDTO.userId ?? null;
    this.boardId = taskDTO.boardId ?? null;
    this.columnId = taskDTO.columnId ?? null;
  }
}
