import { Maybe, RecordWithId } from '~src/common/types';

/**
 * Interface for repository that declare CRUD operations
 */
export interface IDBRepository<T extends RecordWithId> {
  create(item: T): Promise<Maybe<T>>;
  read(id: string): Promise<Maybe<T>>;
  read(): Promise<T[]>;
  update(id: string, item: T): Promise<Maybe<T>>;
  delete(id: string): Promise<boolean>;
}

/**
 * CRUD Repository that use Map for mock in-memory DB
 */
export class MemoryRepository<T extends RecordWithId>
  implements IDBRepository<T>
{
  private _store: Map<string, T> = new Map();

  /**
   * Create record in memory DB
   * @param record - object with field `id`
   * @returns Promise with {@link Maybe} created record
   */
  public async create(record: T): Promise<Maybe<T>> {
    this._store.set(record.id, record);
    return record;
  }

  /**
   * Read all records
   * @returns Promise with array of records
   */
  public async read(): Promise<T[]>;
  /**
   * Read record by id
   * @param id - string identifier for record
   * @returns Promise with {@link Maybe} found record
   */
  public async read(id: string): Promise<Maybe<T>>;
  /**
   * Overloaded Read operation
   * @param id - optional string identifier
   * @returns Promise with array of records or Promise with {@link Maybe} found record
   * @see https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
   */
  public async read(id?: string): Promise<Maybe<T> | T[]> {
    switch (typeof id) {
      case 'string':
        return this._store.get(id);
      default:
        return [...this._store.values()];
    }
  }

  /**
   * Update record if it exists in memory DB
   * @param id - string identifier for record
   * @param record - that need to replace old one
   * @returns Promise with {@link Maybe} updated record
   */
  public async update(id: string, record: T): Promise<Maybe<T>> {
    if (!this._store.has(id)) return undefined;
    this._store.set(id, record);
    return record;
  }

  /**
   * Delete record if it exists in memory DB
   * @param id - string identifier for record
   * @returns Promise with boolean result of operation
   */
  public async delete(id: string): Promise<boolean> {
    return this._store.delete(id);
  }
}
