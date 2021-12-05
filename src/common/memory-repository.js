/**
 * @template { { id:string; [p:string]: string; } } T
 */
export class MemoryRepository {
  constructor() {
    /** @type { Map<string, T> } */
    this._store = new Map();
  }

  /**
   * @return { Promise<T[]> }
   */
  async getAll() {
    return [...this._store.values()];
  }

  /**
   * @param { string } id
   * @return { Promise<T | undefined> }
   */
  async getById(id) {
    return this._store.get(id);
  }

  /**
   * @param { T } item
   * @return { Promise<T> }
   */
  async create(item) {
    this._store.set(item.id, item);
    return item;
  }

  /**
   * @param { string } id
   * @return { Promise<boolean> }
   */
  async delete(id) {
    return this._store.delete(id);
  }

  /**
   @param { string } id
   @param { T } item
   @return { Promise<T | undefined> }
   */
  async update(id, item) {
    if (!this._store.has(id)) return undefined;
    this._store.set(id, item);
    return item;
  }
}
