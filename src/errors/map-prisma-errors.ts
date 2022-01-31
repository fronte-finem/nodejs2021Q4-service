import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

/**
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
 */
const enum PrismaErrorCode {
  NOT_FOUND = 'P2025',
}

/**
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/handling-exceptions-and-errors
 */
export function mapPrismaErrors(error: unknown): unknown {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return mapPrismaClientKnownRequestError(error);
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    return mapPrismaClientValidationError(error);
  }
  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    return new InternalServerErrorException();
  }
  return error;
}

function mapPrismaClientKnownRequestError(
  error: Prisma.PrismaClientKnownRequestError
): HttpException {
  const { code } = error;
  switch (code) {
    case PrismaErrorCode.NOT_FOUND:
      return new NotFoundException();
    default:
      return new UnprocessableEntityException(error.name);
  }
}

function mapPrismaClientValidationError(error: Prisma.PrismaClientValidationError): HttpException {
  return new BadRequestException(error.name);
}
