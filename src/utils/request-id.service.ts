import { Injectable } from '@nestjs/common';

@Injectable()
export class RequestIdService {
  private _id = 0;

  generateId(): number {
    const id = this._id;
    this._id += 1;
    if (this._id === Number.MAX_SAFE_INTEGER) {
      this._id = 0;
    }
    return id;
  }
}
