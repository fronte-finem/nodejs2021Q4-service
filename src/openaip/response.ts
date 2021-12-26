import { HttpStatusCode } from '../common/http-constants';

/**
 * OpenAPI fragment for response
 */
export type OpenApiHttpResponse = Readonly<{
  [statusCode: number]: Readonly<{
    description: string;
    $ref: string;
  }>;
}>;

/**
 * OpenAPI fragment for response with array
 */
export type OpenApiHttpResponseArray = Readonly<{
  [statusCode: number]: Readonly<{
    description: string;
    type: 'array';
    items: { $ref: string };
  }>;
}>;

/**
 * OpenAPI fragment for empty response
 */
export type OpenApiHttpResponseEmpty = Readonly<{
  [statusCode: number]: Readonly<{
    description: string;
    type: 'null';
  }>;
}>;

const SUCCESSFUL_OPERATION = 'Successful operation';

/**
 * Helper that assemble OpenAPI fragment for response
 * @param $ref - string reference to schema with response object
 * @param description - string representation of response
 * @param statusCode - number for HTTP status code
 * @returns OpenAPI fragment for response
 */
export const makeOpenApiHttpResponse = (
  $ref: string,
  description = SUCCESSFUL_OPERATION,
  statusCode = HttpStatusCode.OK
): OpenApiHttpResponse => ({
  [statusCode]: { description, $ref },
});

/**
 * Helper that assemble OpenAPI fragment for response with Array
 * @param $ref - string reference to schema with response object
 * @param description - string representation of response
 * @param statusCode - number for HTTP status code
 * @returns OpenAPI fragment for response with Array
 */
export const makeOpenApiHttpResponseArray = (
  $ref: string,
  description = SUCCESSFUL_OPERATION,
  statusCode = HttpStatusCode.OK
): OpenApiHttpResponseArray => ({
  [statusCode]: {
    description,
    type: 'array',
    items: { $ref },
  },
});

/**
 * Helper that assemble OpenAPI fragment for empty response
 * @param description - string representation of response
 * @param statusCode - number for HTTP status code
 * @returns OpenAPI fragment for empty response
 */
export const makeOpenApiHttpResponseEmpty = (
  description = SUCCESSFUL_OPERATION,
  statusCode = HttpStatusCode.NO_CONTENT
): OpenApiHttpResponseEmpty => ({
  [statusCode]: { description, type: 'null' },
});
