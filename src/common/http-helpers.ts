import { Request } from 'express';
import { UNKNOWN_REQUEST_ID } from '../services/request-id.service';

export const REQUEST_IDS = Symbol('REQUEST_IDS');

type Extension = { [REQUEST_IDS]: string };

export type RequestExtension = Request & Extension & { raw: Extension };

export function getIds(request: RequestExtension): string {
  return request[REQUEST_IDS] ?? (request.raw && request.raw[REQUEST_IDS]) ?? UNKNOWN_REQUEST_ID;
}
