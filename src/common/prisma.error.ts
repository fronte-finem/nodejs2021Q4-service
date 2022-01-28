import { Prisma } from '@prisma/client';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

/**
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
 */
const enum PrismaErrorCode {
  NOT_FOUND = 'P2025',
}

type MetaErrorInfo = Record<string, unknown>;

/**
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
 */
export function mapPrismaErrorToNestException(error: unknown): HttpException {
  if (!(error instanceof Error)) {
    throw new InternalServerErrorException(error);
  }
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    throw new InternalServerErrorException(error.message);
  }

  const { code, meta } = error;
  const message = (<MetaErrorInfo>meta)?.cause ?? error.message;

  switch (code) {
    case PrismaErrorCode.NOT_FOUND:
      return new NotFoundException(message);
    default:
      return new InternalServerErrorException(message);
  }
}
