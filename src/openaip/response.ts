import { HttpStatusCode } from 'common/http-constants';

/**
 * {@link https://swagger.io/specification/ | OpenAPI} fragment for response
 */
export type HttpResponseType = Readonly<{
  [statusCode: number]: Readonly<{
    description: string;
    $ref: string;
  }>;
}>;

/**
 * {@link https://swagger.io/specification/ | OpenAPI} fragment for response with array
 */
export type HttpResponseArrayType = Readonly<{
  [statusCode: number]: Readonly<{
    description: string;
    type: 'array';
    items: { $ref: string };
  }>;
}>;

/**
 * {@link https://swagger.io/specification/ | OpenAPI} fragment for empty response
 */
export type HttpResponseEmptyType = Readonly<{
  [statusCode: number]: Readonly<{
    description: string;
    type: 'null';
  }>;
}>;

/**
 * Helper that assemble {@link https://swagger.io/specification/ | OpenAPI} fragment for response
 * @param $ref - string reference to schema with response object
 * @param description - string representation of response
 * @param statusCode - number for HTTP status code
 * @returns {@link https://swagger.io/specification/ | OpenAPI} fragment for response
 */
export const makeHttpResponse = (
  $ref: string,
  description: string,
  statusCode?: number
): HttpResponseType => ({
  [statusCode ?? HttpStatusCode.OK]: { description, $ref },
});

/**
 * Helper that assemble {@link https://swagger.io/specification/ | OpenAPI} fragment for response with Array
 * @param $ref - string reference to schema with response object
 * @param description - string representation of response
 * @param statusCode - number for HTTP status code
 * @returns {@link https://swagger.io/specification/ | OpenAPI} fragment for response with Array
 */
export const makeHttpResponseArray = (
  $ref: string,
  description: string,
  statusCode?: number
): HttpResponseArrayType => ({
  [statusCode ?? HttpStatusCode.OK]: {
    description,
    type: 'array',
    items: { $ref },
  },
});

/**
 * Helper that assemble {@link https://swagger.io/specification/ | OpenAPI} fragment for empty response
 * @param description - string representation of response
 * @param statusCode - number for HTTP status code
 * @returns {@link https://swagger.io/specification/ | OpenAPI} fragment for empty response
 */
export const makeHttpResponseEmpty = (
  description: string,
  statusCode?: number
): HttpResponseEmptyType => ({
  [statusCode ?? HttpStatusCode.NO_CONTENT]: { description, type: 'null' },
});
