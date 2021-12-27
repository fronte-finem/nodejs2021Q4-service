import { randomUUID } from 'crypto';
import { Column } from './column.model.js';

export class Board {
  constructor({ id = randomUUID(), title = 'Autotest', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns: columns.map(Column.toResponse) };
  }
}
