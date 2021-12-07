import { randomUUID } from 'crypto';

/**
 * Type that present result which may or may not contain value
 * @typeParam Value - generic type for possible value
 * @see https://en.wikipedia.org/wiki/Option_type
 */
export declare type Maybe<Value> = Value | undefined | null;

/**
 * Interface that declare a record with string id
 */
export declare interface RecordWithId {
  readonly id: string;
}

export declare class BaseModel implements RecordWithId {
  public readonly id: string;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
  }
}
