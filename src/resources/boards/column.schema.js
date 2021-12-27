import S from 'fluent-json-schema';
import { uuidKey } from '../../common/schemas.types.js';

const ColumnField = Object.freeze({
  ID: 'id',
  TITLE: 'title',
  ORDER: 'order',
});

const createFields = [ColumnField.TITLE, ColumnField.ORDER];

const ColumnBaseSchema = S.object()
  .id('ColumnBase')
  .additionalProperties(false)
  .prop(ColumnField.ID, uuidKey)
  .prop(ColumnField.TITLE, S.string())
  .prop(ColumnField.ORDER, S.number());

export const ColumnSchemaID = Object.freeze({
  READ: 'ColumnRead',
  CREATE: 'ColumnCreate',
  UPDATE: 'ColumnUpdate',
});

export const ColumnSchema = Object.freeze({
  READ: S.object().id(ColumnSchemaID.READ).extend(ColumnBaseSchema),

  CREATE: S.object()
    .id(ColumnSchemaID.CREATE)
    .extend(ColumnBaseSchema.only(createFields).required(createFields)),

  UPDATE: S.object()
    .id(ColumnSchemaID.UPDATE)
    .extend(ColumnBaseSchema.required(createFields)),
});

export const ColumnSchemaRef = Object.freeze({
  READ: S.ref(ColumnSchemaID.READ),
  CREATE: S.ref(ColumnSchemaID.CREATE),
  UPDATE: S.ref(ColumnSchemaID.UPDATE),
});
