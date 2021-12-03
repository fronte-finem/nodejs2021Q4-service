import { UserSchema } from '../resources/users/user.schema.js';
import { HttpErrorSchema } from './http-error.schema.js';

export const addSchemas = (app) => {
  app
    .addSchema(HttpErrorSchema)
    .addSchema(UserSchema.MODEL)
    .addSchema(UserSchema.READ)
    .addSchema(UserSchema.CREATE)
    .addSchema(UserSchema.UPDATE)
    .addSchema(UserSchema.LOGIN);
};
