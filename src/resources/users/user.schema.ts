import S, {
  ExtendedSchema,
  JSONSchema,
  ObjectSchema,
} from 'fluent-json-schema';
import { uuidKey } from 'openaip/keys';

const enum UserField {
  ID = 'id',
  NAME = 'name',
  LOGIN = 'login',
  PASSWORD = 'password',
}

export const enum UserSchemaID {
  BASE = 'UserBase',
  READ = 'UserRead',
  CREATE = 'UserCreate',
  UPDATE = 'UserUpdate',
  LOGIN = 'UserLogin',
}

const loginFields = [UserField.LOGIN, UserField.PASSWORD];
const readFields = [UserField.ID, UserField.NAME, UserField.LOGIN];
const createFields = [UserField.NAME, UserField.LOGIN, UserField.PASSWORD];

const UserBaseSchema: ObjectSchema = S.object()
  .id(UserSchemaID.BASE)
  .prop(UserField.ID, uuidKey)
  .prop(UserField.NAME, S.string())
  .prop(UserField.LOGIN, S.string())
  .prop(UserField.PASSWORD, S.string())
  .additionalProperties(false);

export const UserSchema: Readonly<Record<string, ExtendedSchema>> = {
  READ: S.object()
    .id(UserSchemaID.READ)
    .extend(UserBaseSchema.only(readFields)),

  CREATE: S.object()
    .id(UserSchemaID.CREATE)
    .extend(UserBaseSchema.only(createFields).required([UserField.NAME])),

  UPDATE: S.object()
    .id(UserSchemaID.UPDATE)
    .extend(UserBaseSchema.only(createFields).required([UserField.NAME])),

  LOGIN: S.object()
    .id(UserSchemaID.LOGIN)
    .extend(UserBaseSchema.only(loginFields).required(loginFields)),
};

export const UserSchemaRef: Readonly<Record<string, JSONSchema>> = {
  READ: S.ref(UserSchemaID.READ),
  CREATE: S.ref(UserSchemaID.CREATE),
  UPDATE: S.ref(UserSchemaID.UPDATE),
  LOGIN: S.ref(UserSchemaID.LOGIN),
};
