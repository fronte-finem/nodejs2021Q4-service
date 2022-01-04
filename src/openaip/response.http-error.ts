import S, { ObjectSchema } from 'fluent-json-schema';
import { HttpStatusCode } from '../common/http-constants';
import { OpenApiHttpResponse, makeOpenApiHttpResponse } from './response';

const enum HttpErrorField {
  STATUS_CODE = 'statusCode',
  ERROR = 'error',
  MESSAGE = 'message',
}

export const HttpErrorSchemaID = 'HttpError';

export const ResponseHttpError: ObjectSchema = S.object()
  .id(HttpErrorSchemaID)
  .additionalProperties(false)
  .prop(HttpErrorField.STATUS_CODE, S.number().required())
  .prop(HttpErrorField.ERROR, S.string().required())
  .prop(HttpErrorField.MESSAGE, S.string().required());

/**
 * Set of OpenAPI fragments for predefined http errors
 */
export const HttpErrorResponse: Readonly<Record<string, OpenApiHttpResponse>> =
  {
    BAD_REQUEST: makeOpenApiHttpResponse(
      HttpErrorSchemaID,
      'Bad request',
      HttpStatusCode.BAD_REQUEST
    ),
    UNAUTHORIZED: makeOpenApiHttpResponse(
      HttpErrorSchemaID,
      'Access token is missing or invalid',
      HttpStatusCode.UNAUTHORIZED
    ),
    NOT_FOUND: makeOpenApiHttpResponse(
      HttpErrorSchemaID,
      'Not found',
      HttpStatusCode.NOT_FOUND
    ),
  };
