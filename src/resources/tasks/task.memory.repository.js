export class MemoryRepository {
  constructor() {
    /** @type { Map<string, Task> } */
    this._store = new Map();
  }

  /**
   * @param { {$boardId?:string, $userId?:string} } options
   * @return { Promise<Task[]> }
   */
  async getAll({ $boardId, $userId }) {
    const tasks = [...this._store.values()];
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
    const maybeTask = this._store.get($taskId);
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
    this._store.set(task.id, task);
    return task;
  }

  /**
   * @param { string } $boardId
   * @param { string } $taskId
   * @return { Promise<boolean> }
   */
  async delete($boardId, $taskId) {
    const maybeTask = this._store.get($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) {
      return false;
    }
    return this._store.delete($taskId);
  }

  /**
   * @param { string } $boardId
   * @return { Promise<boolean> }
   */
  async deleteByBoard($boardId) {
    [...this._store.entries()].forEach(([id, { boardId }]) => {
      if (boardId === $boardId) {
        this._store.delete(id);
      }
    });
  }

  /**
   * @param { Task } task
   * @return { Promise<Task | undefined> }
   */
  async update(task) {
    const maybeTask = this._store.get(task.id);
    if (!maybeTask) {
      return undefined;
    }
    this._store.set(task.id, task);
    return task;
  }

  /**
   * @param { string } $boardId
   * @param { string } $taskId
   * @param { Task } task
   * @return { Promise<Task | undefined> }
   */
  async updateByBoardId($boardId, $taskId, task) {
    const maybeTask = this._store.get($taskId);
    if (!maybeTask || maybeTask.boardId !== $boardId) {
      return undefined;
    }
    this._store.set($taskId, task);
    return task;
  }
}
/**
 * @type { MemoryRepository<Task> }
 */
export const tasksRepo = new MemoryRepository();
