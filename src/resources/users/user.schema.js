import S from 'fluent-json-schema';

const UserField = Object.freeze({
  ID: 'id',
  NAME: 'name',
  LOGIN: 'login',
  PASSWORD: 'password',
});

const loginFields = [UserField.LOGIN, UserField.PASSWORD];
const readFields = [UserField.ID, UserField.NAME, UserField.LOGIN];
const createFields = [UserField.NAME, UserField.LOGIN, UserField.PASSWORD];

const UserBaseSchema = S.object()
  .id('UserBase')
  .additionalProperties(false)
  .prop(UserField.ID, S.string().format('uuid'))
  .prop(UserField.NAME, S.string())
  .prop(UserField.LOGIN, S.string())
  .prop(UserField.PASSWORD, S.string());

export const UserSchemaID = Object.freeze({
  MODEL: 'UserModel',
  READ: 'UserRead',
  CREATE: 'UserCreate',
  UPDATE: 'UserUpdate',
  LOGIN: 'UserLogin',
});

export const UserSchema = Object.freeze({
  MODEL: S.object().id(UserSchemaID.MODEL).extend(UserBaseSchema),

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
});

export const UserSchemaRef = Object.freeze({
  MODEL: S.ref(UserSchemaID.MODEL),
  READ: S.ref(UserSchemaID.READ),
  CREATE: S.ref(UserSchemaID.CREATE),
  UPDATE: S.ref(UserSchemaID.UPDATE),
  LOGIN: S.ref(UserSchemaID.LOGIN),
});
