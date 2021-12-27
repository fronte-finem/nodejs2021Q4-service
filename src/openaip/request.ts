/**
 *  OpenAPI fragment for set of url id-parameters
 */
export type OpenApiRequestParamProperties = {
  [$id: string]: {
    type: 'string';
    format?: string;
  };
};

/**
 *  OpenAPI fragment for request parameters
 */
export type OpenApiRequestParams = {
  type: 'object';
  properties: OpenApiRequestParamProperties;
  required?: string[];
  additionalProperties: false;
};

/**
 *  Helper for transform array of ID to OpenAPI fragment for request parameters with IDs in UUID format
 *  @param ids - array of string ID
 *  @returns OpenAPI fragment for request parameters with IDs in UUID format
 */
export const makeOpenAPIUuidRequestParams = (
  ids: string[]
): OpenApiRequestParams => {
  const properties = ids.reduce((acc, $id) => {
    acc[$id] = { type: 'string', format: 'uuid' };
    return acc;
  }, {} as OpenApiRequestParamProperties);

  return {
    type: 'object',
    properties,
    required: ids,
    additionalProperties: false,
  };
};
