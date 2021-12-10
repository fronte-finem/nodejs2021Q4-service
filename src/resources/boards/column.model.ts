import { BaseModel, RecordWithId } from '~src/common/types';

export interface ColumnDTO extends RecordWithId {
  readonly title: string;
  readonly order: number;
}

export class Column extends BaseModel implements ColumnDTO {
  public readonly order: number;
  public readonly title: string;

  constructor({ id, title, order }: Partial<ColumnDTO> = {}) {
    super(id);
    this.title = title ?? 'Backlog';
    this.order = order ?? 1;
  }
}
