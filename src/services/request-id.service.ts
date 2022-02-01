import { Injectable } from '@nestjs/common';

const MAX_ID_LENGTH = 10;
const MAX_ID = Number(''.padEnd(MAX_ID_LENGTH, '9'));
export const UNKNOWN_REQUEST_ID = `${MAX_ID}`;

const FILLER = '·';

@Injectable()
export class RequestIdService {
  private _id = 0;

  generateId(): string {
    const id = `${this._id}`.padStart(MAX_ID_LENGTH, FILLER);
    this._id += 1;
    if (this._id > MAX_ID) {
      this._id = 0;
    }
    return id;
  }
}
