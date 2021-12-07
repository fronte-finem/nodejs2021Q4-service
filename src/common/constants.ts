import { OpenAPIV3 } from 'openapi-types';

/**
 * {@link https://swagger.io/specification/ | OpenAPI} schema endpoint tags
 */
export const ApiEndpointTag: Readonly<Record<string, OpenAPIV3.TagObject>> = {
  USERS: { name: 'Users' },
  BOARDS: { name: 'Boards' },
  TASKS: { name: 'Tasks' },
  LOGIN: { name: 'Login' },
};
