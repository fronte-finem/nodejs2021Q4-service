import { v4 as uuidv4 } from 'uuid';

export class Column {
  constructor({ id = uuidv4(), title = 'Backlog', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}
