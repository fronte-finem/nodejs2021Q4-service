// TODO: mock implementation. should be replaced during task development
import { User } from './user.model.js';

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
    const maybeUser = this.#store.get(id);
    return maybeUser && new User(maybeUser);
  }

  /**
   * @param { User } user
   * @return { Promise<User> }
   */
  async create(user) {
    this.#store.set(user.id, user);
    return user;
  }
}

export const usersRepo = new UserMemoryRepository();
