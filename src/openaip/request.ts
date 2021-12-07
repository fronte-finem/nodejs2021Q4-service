/**
 *  Type for describe url id-parameter
 */
export type UrlParam = {
  $id: string;
  format?: string;
  required?: boolean;
};

/**
 *  Fastify JSON-Schema fragment for set of url id-parameters
 */
export type RequestParamProperties = {
  [$id: string]: {
    type: 'string';
    format?: string;
  };
};

/**
 *  Fastify JSON-Schema fragment for request parameters
 */
export type RequestParams = {
  type: 'object';
  properties: RequestParamProperties;
  required?: string[];
  additionalProperties: false;
};

/**
 *  Helper for transform array of url parameters to Fastify JSON-Schema fragment for request parameters
 *  @param params - array of url parameters
 *  @returns Fastify JSON-Schema fragment for request parameters
 */
export const makeRequestParams = (params: UrlParam[]): RequestParams => {
  const required = params.filter((p) => p.required).map((p) => p.$id);

  const properties = params.reduce((acc, { $id, format }) => {
    acc[$id] = { type: 'string', format };
    return acc;
  }, {} as RequestParamProperties);

  return {
    type: 'object',
    properties,
    required,
    additionalProperties: false,
  };
};

/**
 *  Helper for transform array of ID to Fastify JSON-Schema fragment for request parameters with IDs in UUID format
 *  @param ids - array of string ID
 *  @returns Fastify JSON-Schema fragment for request parameters with IDs in UUID format
 */
export const makeUuidRequestParams = (ids: string[]): RequestParams => {
  const properties = ids.reduce((acc, $id) => {
    acc[$id] = { type: 'string', format: 'uuid' };
    return acc;
  }, {} as RequestParamProperties);

  return {
    type: 'object',
    properties,
    required: ids,
    additionalProperties: false,
  };
};
