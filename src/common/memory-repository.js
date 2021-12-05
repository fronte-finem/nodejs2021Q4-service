export class MemoryRepository {
  constructor() {
    /**
     * @type { Map<string, ItemWithId> }
     */
    this._store = new Map();
  }

  /**
   * @param { ItemWithId } item
   * @return { Promise<ItemWithId> }
   */
  async create(item) {
    this._store.set(item.id, item);
    return item;
  }

  /**
   * @param { string } [id]
   * @return { Promise<Maybe<ItemWithId> | ItemWithId[]> }
   */
  async read(id) {
    switch (typeof id) {
      case 'string':
        return this._store.get(id);
      default:
        return [...this._store.values()];
    }
  }

  /**
   @param { string } id
   @param { ItemWithId } item
   @return { Promise<Maybe<ItemWithId>> }
   */
  async update(id, item) {
    if (!this._store.has(id)) return undefined;
    this._store.set(id, item);
    return item;
  }

  /**
   * @param { string } id
   * @return { Promise<boolean> }
   */
  async delete(id) {
    return this._store.delete(id);
  }
}
