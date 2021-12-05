export class MemoryRepository {
  /**
   * @type { Map<string, Task> }
   */
  #store = new Map();

  /**
   * @param { string } $boardId
   * @return { Promise<Task[]> }
   */
  async getAll($boardId) {
    return [...this.#store.values()].filter(
      ({ boardId }) => boardId === $boardId
    );
  }

  /**
   * @param { string } $boardId
   * @param { string } $taskId
   * @return { Promise<Task | undefined> }
   */
  async getById($boardId, $taskId) {
    const maybeTask = this.#store.get($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) {
      return undefined;
    }
    return maybeTask;
  }

  /**
   * @param { Task } task
   * @return { Promise<Task> }
   */
  async create(task) {
    this.#store.set(task.id, task);
    return task;
  }

  /**
   * @param { string } $boardId
   * @param { string } $taskId
   * @return { Promise<boolean> }
   */
  async delete($boardId, $taskId) {
    const maybeTask = this.#store.get($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) {
      return false;
    }
    return this.#store.delete($taskId);
  }

  /**
   * @param { string } $boardId
   * @param { string } $taskId
   * @param { Task } task
   * @return { Promise<Task | undefined> }
   */
  async update($boardId, $taskId, task) {
    const maybeTask = this.#store.get($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) {
      return undefined;
    }
    this.#store.set($taskId, task);
    return task;
  }
}

/**
 * @type { MemoryRepository<Task> }
 */
export const tasksRepo = new MemoryRepository();
