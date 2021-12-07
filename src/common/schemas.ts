import { FastifyInstance } from 'fastify';
import { HttpErrorSchema } from './http-error.schema.js';
import { ColumnSchema } from '../resources/boards/column.schema.js';
import { BoardSchema } from '../resources/boards/board.schema.js';
import { TaskSchema } from '../resources/tasks/task.schema.js';
import { UserSchema } from '../resources/users/user.schema.js';

/**
 * Add {@link https://swagger.io/specification/ | OpenAPI} documentation schemas to fastify instance
 * @param app - fastify instance
 */
export const addSchemas = (app: FastifyInstance): void => {
  app
    .addSchema(HttpErrorSchema)
    .addSchema(UserSchema.MODEL)
    .addSchema(UserSchema.READ)
    .addSchema(UserSchema.CREATE)
    .addSchema(UserSchema.UPDATE)
    .addSchema(UserSchema.LOGIN)
    .addSchema(ColumnSchema.READ)
    .addSchema(ColumnSchema.CREATE)
    .addSchema(ColumnSchema.UPDATE)
    .addSchema(BoardSchema.READ)
    .addSchema(BoardSchema.CREATE)
    .addSchema(BoardSchema.UPDATE)
    .addSchema(TaskSchema.READ)
    .addSchema(TaskSchema.CREATE)
    .addSchema(TaskSchema.UPDATE);
};
