/**
 * @template { { id:string; [p:string]: string; } } T
 */
export class MemoryRepository {
  /**
   * @type { Map<string, T> }
   */
  #store = new Map();

  /**
   * @return { Promise<T[]> }
   */
  async getAll() {
    return [...this.#store.values()];
  }

  /**
   * @param { string } id
   * @return { Promise<T | undefined> }
   */
  async getById(id) {
    return this.#store.get(id);
  }

  /**
   * @param { T } item
   * @return { Promise<T> }
   */
  async create(item) {
    this.#store.set(item.id, item);
    return item;
  }

  /**
   * @param { string } id
   * @return { Promise<boolean> }
   */
  async delete(id) {
    return this.#store.delete(id);
  }

  /**
   @param { string } id
   @param { T } item
   @return { Promise<T | undefined> }
   */
  async update(id, item) {
    if (!this.#store.has(id)) return undefined;
    this.#store.set(id, item);
    return item;
  }
}
