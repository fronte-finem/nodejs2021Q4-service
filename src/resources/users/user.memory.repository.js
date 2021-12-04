class UserMemoryRepository {
  /**
   * @type { Map<string, User> }
   */
  #store = new Map();

  /**
   * @return { Promise<User[]> }
   */
  async getAll() {
    return [...this.#store.values()];
  }

  /**
   * @param { string } id
   * @return { Promise<User | undefined> }
   */
  async getById(id) {
    return this.#store.get(id);
  }

  /**
   * @param { User } user
   * @return { Promise<User> }
   */
  async create(user) {
    this.#store.set(user.id, user);
    return user;
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
   @param { User } user
   @return { Promise<User | undefined> }
   */
  async update(id, user) {
    if (!this.#store.has(id)) return undefined;
    this.#store.set(id, user);
    return user;
  }
}

export const usersRepo = new UserMemoryRepository();
