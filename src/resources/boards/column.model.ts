import { BaseModel, RecordWithId } from 'types/common';

export interface ColumnDTO extends RecordWithId {
  readonly title: string;
  readonly order: number;
}

export type ColumnOptions = ColumnDTO | Record<string, never>;

export class Column extends BaseModel implements ColumnDTO {
  public readonly order: number;
  public readonly title: string;

  constructor({ id, title, order }: ColumnOptions = {}) {
    super(id);
    this.title = title ?? 'Backlog';
    this.order = order ?? 1;
  }
}
