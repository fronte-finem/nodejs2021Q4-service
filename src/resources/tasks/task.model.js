import { randomUUID } from 'crypto';

export class Task {
  constructor({
    id = randomUUID(),
    title = 'Test Task',
    order = 1,
    description = 'Lorem ipsum',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    /** @type { null | string } */
    this.userId = userId;
    /** @type { null | string } */
    this.boardId = boardId;
    /** @type { null | string } */
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
