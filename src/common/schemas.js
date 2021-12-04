import { UserSchema } from '../resources/users/user.schema.js';
import { HttpErrorSchema } from './http-error.schema.js';
import { ColumnSchema } from '../resources/boards/column.schema.js';
import { BoardSchema } from '../resources/boards/board.schema.js';

export const addSchemas = (app) => {
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
    .addSchema(BoardSchema.UPDATE);
};
