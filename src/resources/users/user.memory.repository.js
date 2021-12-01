// TODO: mock implementation. should be replaced during task development
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
}

export const usersRepo = new UserMemoryRepository();
