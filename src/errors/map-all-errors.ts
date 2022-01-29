import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function mapAllErrors(error: unknown): HttpException {
  return error instanceof HttpException
    ? error
    : new InternalServerErrorException((<Error>error)?.message ?? error);
}
