import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectLike } from '../common/types';

/**
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
 */
const enum PrismaErrorCode {
  UNIQUE_CONSTRAINT = 'P2002',
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

type PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError & { meta?: ObjectLike };

function mapPrismaClientKnownRequestError(
  error: Prisma.PrismaClientKnownRequestError
): HttpException {
  const { code, message, meta } = error as PrismaClientKnownRequestError;
  switch (code) {
    case PrismaErrorCode.UNIQUE_CONSTRAINT:
      return new BadRequestException(`Unique constraint failed on the fields: (${meta?.target})`);
    case PrismaErrorCode.NOT_FOUND:
      return new NotFoundException(message);
    default:
      return new UnprocessableEntityException(message);
  }
}

function mapPrismaClientValidationError(error: Prisma.PrismaClientValidationError): HttpException {
  return new BadRequestException(error.name);
}
