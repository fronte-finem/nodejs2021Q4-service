import { HttpStatus, SetMetadata } from '@nestjs/common';
import {
  ApiResponseOptions,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { ErrorResponseDto } from '../errors/error-response.dto';

const getOptions = (statusCode: number): ApiResponseOptions => ({
  type: ErrorResponseDto,
  description: STATUS_CODES[statusCode],
});

export const ApiResponse = {
  NoContent: ApiNoContentResponse({ description: STATUS_CODES[HttpStatus.NO_CONTENT] }),
  Unauthorized: ApiUnauthorizedResponse(getOptions(HttpStatus.UNAUTHORIZED)),
  Forbidden: ApiForbiddenResponse(getOptions(HttpStatus.FORBIDDEN)),
  BadRequest: ApiBadRequestResponse(getOptions(HttpStatus.BAD_REQUEST)),
  NotFound: ApiNotFoundResponse(getOptions(HttpStatus.NOT_FOUND)),
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
