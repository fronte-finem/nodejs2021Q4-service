export class MemoryRepository {
  /**
   * @type { Map<string, Task> }
   */
  #store = new Map();

  /**
   * @param { {$boardId?:string, $userId?:string} } options
   * @return { Promise<Task[]> }
   */
  async getAll({ $boardId, $userId }) {
    const tasks = [...this.#store.values()];
    if (!$boardId && !$userId) return tasks;
    return $boardId
      ? tasks.filter(({ boardId }) => boardId === $boardId)
      : tasks.filter(({ userId }) => userId === $userId);
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
   * @return { Promise<boolean> }
   */
  async deleteByBoard($boardId) {
    [...this.#store.entries()].forEach(([id, { boardId }]) => {
      if (boardId === $boardId) {
        this.#store.delete(id);
      }
    });
  }

  /**
   * @param { Task } task
   * @return { Promise<Task | undefined> }
   */
  async update(task) {
    const maybeTask = this.#store.get(task.id);
    if (!maybeTask) {
      return undefined;
    }
    this.#store.set(task.id, task);
    return task;
  }

  /**
   * @param { string } $boardId
   * @param { string } $taskId
   * @param { Task } task
   * @return { Promise<Task | undefined> }
   */
  async updateByBoardId($boardId, $taskId, task) {
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
