import { HttpStatusCode } from './http-constants.js';

/**
 * @typedef {
 *  Readonly<{
 *    [statusCode: number]: Readonly<{
 *      description: string;
 *      $ref: string;
 *    }>
 *  }>
 * } HttpErrorResponseType
 */
/**
 * @typedef {
 *  Readonly<{
 *    [statusCode: number]: Readonly<{
 *      description: string;
 *      $ref: string;
 *    }>
 *  }>
 * } SuccessfulResponseType
 */
/**
 * @typedef {
 *  Readonly<{
 *    [statusCode: number]: Readonly<{
 *      description: string;
 *      type: 'array';
 *      items: { $ref: string };
 *    }>
 *  }>
 * } SuccessfulArrayResponseType
 */
/**
 * @typedef {
 *  Readonly<{
 *    [statusCode: number]: Readonly<{
 *      description: string;
 *      type: 'null';
 *    }>
 *  }>
 * } SuccessfulEmptyResponseType
 */

/**
 * @param { string } $ref
 * @param { number } statusCode
 * @param { string } description
 * @return { HttpErrorResponseType }
 */
export const makeHttpErrorResponse = ($ref, statusCode, description) =>
  Object.freeze({
    [statusCode]: Object.freeze({
      description,
      $ref,
    }),
  });

/**
 * @template { false | true } T
 * @param { string | null } $ref
 * @param { number } statusCode
 * @param { string } description
 * @param { T } [isArray]
 * @returns { SuccessfulResponseType | SuccessfulArrayResponseType | SuccessfulEmptyResponseType }
 */
const _makeSuccessfulResponse = (
  $ref,
  statusCode = HttpStatusCode.OK,
  description = 'Successful operation',
  isArray = false
) => {
  let response;
  if ($ref === null) {
    response = { type: 'null' };
  } else {
    response = isArray ? { type: 'array', items: { $ref } } : { $ref };
  }

  return Object.freeze({
    [statusCode]: Object.freeze({
      description,
      ...response,
    }),
  });
};

/**
 * @param { string } $ref
 * @param { number } [statusCode]
 * @param { string } [description]
 * @return { SuccessfulResponseType }
 */
export const makeSuccessfulResponse = ($ref, statusCode, description) =>
  _makeSuccessfulResponse($ref, statusCode, description);

/**
 * @param { string } $ref
 * @param { number } [statusCode]
 * @param { string } [description]
 * @return { SuccessfulArrayResponseType }
 */
export const makeSuccessfulArrayResponse = ($ref, statusCode, description) =>
  _makeSuccessfulResponse($ref, statusCode, description, true);

/**
 * @param { number } [statusCode]
 * @param { string } [description]
 * @return { SuccessfulEmptyResponseType }
 */
export const makeSuccessfulEmptyResponse = (statusCode, description) =>
  _makeSuccessfulResponse(null, statusCode || 204, description, true);
