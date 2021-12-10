import { BaseModel, RecordWithId } from '~src/types/common';

export interface TaskDTO extends RecordWithId {
  readonly title: string;
  readonly order: number;
  readonly description: string;
  readonly userId: null | string;
  readonly boardId: null | string;
  readonly columnId: null | string;
}

export class Task extends BaseModel implements TaskDTO {
  public readonly boardId: string | null;
  public readonly columnId: string | null;
  public readonly description: string;
  public readonly order: number;
  public readonly title: string;
  public readonly userId: string | null;

  constructor(options: Partial<TaskDTO> = {}) {
    super(options.id);
    this.title = options.title ?? 'Test Task';
    this.order = options.order ?? 1;
    this.description = options.description ?? 'Lorem ipsum';
    this.userId = options.userId ?? null;
    this.boardId = options.boardId ?? null;
    this.columnId = options.columnId ?? null;
  }
}
