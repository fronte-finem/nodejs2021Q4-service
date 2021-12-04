import { v4 as uuidv4 } from 'uuid';
import { Column } from './column.model.js';

export class Board {
  constructor({ id = uuidv4(), title = 'Autotest', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns: columns.map(Column.toResponse) };
  }
}
