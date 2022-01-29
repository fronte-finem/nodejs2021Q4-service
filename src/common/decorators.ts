import { HttpStatus } from '@nestjs/common';
import {
  ApiResponseOptions,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { ErrorResponseDto } from '../errors/error-response.dto';

const getOptions = (statusCode: number): ApiResponseOptions => ({
  type: ErrorResponseDto,
  description: STATUS_CODES[statusCode],
});

export const ApiResponse = {
  NoContent: ApiNoContentResponse({ description: STATUS_CODES[HttpStatus.NO_CONTENT] }),
  Forbidden: ApiForbiddenResponse(getOptions(HttpStatus.FORBIDDEN)),
  BadRequest: ApiBadRequestResponse(getOptions(HttpStatus.BAD_REQUEST)),
  NotFound: ApiNotFoundResponse(getOptions(HttpStatus.NOT_FOUND)),
};
