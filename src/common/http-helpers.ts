import { Request } from 'express';
import { defaultRequestIds, RequestIds } from '../services/request-id.service';

export const REQUEST_IDS = Symbol('REQUEST_IDS');

type Extension = { [REQUEST_IDS]: RequestIds };

export type RequestExtension = Request & Extension & { raw: Extension };

export function getIds(request: RequestExtension): RequestIds {
  return request[REQUEST_IDS] ?? request.raw[REQUEST_IDS] ?? defaultRequestIds;
}
