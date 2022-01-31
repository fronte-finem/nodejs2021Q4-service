import { Injectable } from '@nestjs/common';

const MAX_ID_LENGTH = 10;
const MAX_ID = Number(''.padEnd(MAX_ID_LENGTH, '9'));

const FILLER = '·';
const IN = '▶▶';
const OUT = '◀◀';
const ERROR = '❌';

export interface RequestIds {
  id: string;
  inputId: string;
  outputId: string;
  errorId: string;
}

@Injectable()
export class RequestIdService {
  private _id = 0;

  generateIds(): RequestIds {
    const id = `${this._id}`.padStart(MAX_ID_LENGTH, FILLER);
    this._id += 1;
    if (this._id > MAX_ID) {
      this._id = 0;
    }
    return {
      id,
      inputId: `${id} ${IN}`,
      outputId: `${id} ${OUT}`,
      errorId: `${id} ${ERROR}`,
    };
  }
}

export const defaultRequestIds: RequestIds = Object.freeze({
  id: `${MAX_ID}`,
  inputId: `${MAX_ID} ${IN}`,
  outputId: `${MAX_ID} ${OUT}`,
  errorId: `${MAX_ID} ${ERROR}`,
});
