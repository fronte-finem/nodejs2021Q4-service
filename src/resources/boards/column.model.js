import { randomUUID } from 'crypto';

export class Column {
  constructor({ id = randomUUID(), title = 'Backlog', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}
