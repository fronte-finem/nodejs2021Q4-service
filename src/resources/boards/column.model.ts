import { BaseModel, RecordWithId } from '../../common/types';

export interface ColumnDTO extends RecordWithId {
  readonly title: string;
  readonly order: number;
}

/**
 * Model for column record
 */
export class Column extends BaseModel implements ColumnDTO {
  public readonly title: string;
  public readonly order: number;

  /**
   * Create column record
   * @param columnDTO - partial form of {@link ColumnDTO}
   * @returns instance of {@link Column}
   */
  constructor({ id, title, order }: Partial<ColumnDTO> = {}) {
    super(id);
    this.title = title ?? 'Backlog';
    this.order = order ?? 1;
  }
}
