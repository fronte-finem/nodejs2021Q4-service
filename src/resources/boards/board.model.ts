import { BaseModel, RecordWithId } from '~src/common/types';
import { ColumnDTO } from './column.model';

export interface BoardDTO extends RecordWithId {
  readonly title: string;
  readonly columns: ColumnDTO[];
}

/**
 * Model for board record
 */
export class Board extends BaseModel implements BoardDTO {
  public readonly title: string;
  public readonly columns: ColumnDTO[];

  /**
   * Create board record
   * @param boardDTO - partial form of {@link BoardDTO}
   * @returns instance of {@link Board}
   */
  constructor({ id, title, columns }: Partial<BoardDTO> = {}) {
    super(id);
    this.title = title ?? 'Autotest';
    this.columns = columns ?? [];
  }
}
