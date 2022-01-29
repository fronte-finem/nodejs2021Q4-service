import { Prisma } from '@prisma/client';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

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
export function mapPrismaErrors(error: unknown): unknown {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return error;
  }
  const { code, meta } = error;
  const message = (<MetaErrorInfo>meta)?.cause ?? error.message.replace(/.*\n\s*/g, '');

  switch (code) {
    case PrismaErrorCode.NOT_FOUND:
      return new NotFoundException(message);
    default:
      return new InternalServerErrorException(message);
  }
}
