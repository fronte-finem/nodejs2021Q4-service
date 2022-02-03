import { Request } from 'express';

export const REQUEST_ID = Symbol('REQUEST_ID');

type Extension = { [REQUEST_ID]: number };

export type RequestExtension = Request & Extension & { raw: Extension };

export function getRequestId(request: RequestExtension): number {
  return request[REQUEST_ID] ?? (request.raw && request.raw[REQUEST_ID]) ?? Number.MAX_SAFE_INTEGER;
}
