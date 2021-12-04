import S from 'fluent-json-schema';
import { makeHttpErrorResponse } from './response.js';

const HttpErrorField = Object.freeze({
  STATUS_CODE: 'statusCode',
  ERROR: 'error',
  MESSAGE: 'message',
});

export const HttpErrorSchemaID = 'HttpError';

export const HttpErrorSchema = S.object()
  .id(HttpErrorSchemaID)
  .additionalProperties(false)
  .prop(HttpErrorField.STATUS_CODE, S.number().required())
  .prop(HttpErrorField.ERROR, S.string().required())
  .prop(HttpErrorField.MESSAGE, S.string().required());

export const HttpErrorResponse = Object.freeze({
  BAD_REQUEST: makeHttpErrorResponse(HttpErrorSchemaID, 400, 'Bad request'),
  UNAUTHORIZED: makeHttpErrorResponse(
    HttpErrorSchemaID,
    401,
    'Access token is missing or invalid'
  ),
  NOT_FOUND: makeHttpErrorResponse(HttpErrorSchemaID, 404, 'Not found'),
});
