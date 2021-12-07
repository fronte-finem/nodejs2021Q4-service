import { BaseModel, RecordWithId } from 'types/common';
import { ColumnDTO } from './column.model';

export interface BoardDTO extends RecordWithId {
  readonly title: string;
  readonly columns: ColumnDTO[];
}

export type BoardOptions = BoardDTO | Record<string, never>;

export class Board extends BaseModel implements BoardDTO {
  public readonly title: string;
  public readonly columns: ColumnDTO[];

  constructor({ id, title, columns }: BoardOptions = {}) {
    super(id);
    this.title = title ?? 'Autotest';
    this.columns = columns ?? [];
  }
}
