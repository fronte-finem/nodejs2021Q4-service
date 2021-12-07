/**
 * Type that present result which may or may not contain value
 * @typeParam Value - generic type for possible value
 * @see https://en.wikipedia.org/wiki/Option_type
 */
export declare type Maybe<Value> = Value | undefined | null;

/**
 * Type that declare a record with string id
 */
export declare type RecordWithId = { id: string } & Record<string, unknown>;
