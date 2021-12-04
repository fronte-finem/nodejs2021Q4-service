import { v4 as uuidv4 } from 'uuid';

export class Board {
  constructor({ id = uuidv4(), title = 'Autotest', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
