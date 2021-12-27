/**
 * @typedef {
 *  {
 *     $id: string;
 *     format?: string;
 *     required?: boolean;
 *  }
 * } UrlParam
 */
/**
 * @typedef {
 *  {
 *    [$id: string]: {
 *      type: 'string';
 *      type: 'string';
 *      format?: string;
 *    }
 *  }
 * } RequestParamProperties
 */
/**
 * @typedef {
 *  Readonly<{
 *    type: 'object';
 *    properties: RequestParamProperties;
 *    required?: string[];
 *    additionalProperties: false;
 *  }>
 * } RequestParams
 */

/**
 * @param { UrlParam[] } params
 * @return { RequestParams }
 */
export const makeRequestParams = (params) => {
  const required = params.filter((p) => p.required).map((p) => p.$id);

  const properties = params.reduce(
    (acc, { $id, format }) => {
      acc[$id] = { type: 'string', format };
      return acc;
    },
    /** @type { RequestParamProperties } */ {}
  );

  return {
    type: 'object',
    properties,
    required,
    additionalProperties: false,
  };
};

/**
 * @param { string[] } ids
 * @return { RequestParams }
 */
export const makeUuidRequestParams = (ids) => {
  const properties = ids.reduce(
    (acc, $id) => {
      acc[$id] = { type: 'string', format: 'uuid' };
      return acc;
    },
    /** @type { RequestParamProperties } */ {}
  );

  return {
    type: 'object',
    properties,
    required: ids,
    additionalProperties: false,
  };
};
