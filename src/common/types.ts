import { randomUUID } from 'crypto';

/**
 * Type that present result which may or may not contain value
 * @typeParam Value - generic type for possible value
 * @see https://en.wikipedia.org/wiki/Option_type
 */
export type Maybe<Value> = Value | undefined | null;

/**
 * Interface that declare a record with string id
 */
export interface RecordWithId {
  readonly id: string;
}

/**
 * Base class for models with string id field
 */
export abstract class BaseModel implements RecordWithId {
  protected constructor(public readonly id: string = randomUUID()) {}
}
