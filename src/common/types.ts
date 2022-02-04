export type ObjectLike = Record<number | string | symbol, unknown>;

export type Constructor = new (...args: never[]) => unknown;
