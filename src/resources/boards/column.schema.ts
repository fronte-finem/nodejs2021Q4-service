import S, {
  ExtendedSchema,
  JSONSchema,
  ObjectSchema,
} from 'fluent-json-schema';
import { uuidKey } from 'openaip/keys';

const enum ColumnField {
  ID = 'id',
  TITLE = 'title',
  ORDER = 'order',
}

export const enum ColumnSchemaID {
  BASE = 'ColumnBase',
  READ = 'ColumnRead',
  CREATE = 'ColumnCreate',
  UPDATE = 'ColumnUpdate',
}

const createFields = [ColumnField.TITLE, ColumnField.ORDER];

const ColumnBaseSchema: ObjectSchema = S.object()
  .id(ColumnSchemaID.BASE)
  .prop(ColumnField.ID, uuidKey)
  .prop(ColumnField.TITLE, S.string())
  .prop(ColumnField.ORDER, S.number())
  .additionalProperties(false);

export const ColumnSchema: Readonly<Record<string, ExtendedSchema>> = {
  READ: S.object().id(ColumnSchemaID.READ).extend(ColumnBaseSchema),

  CREATE: S.object()
    .id(ColumnSchemaID.CREATE)
    .extend(ColumnBaseSchema.only(createFields).required(createFields)),

  UPDATE: S.object()
    .id(ColumnSchemaID.UPDATE)
    .extend(ColumnBaseSchema.required(createFields)),
};

export const ColumnSchemaRef: Readonly<Record<string, JSONSchema>> = {
  READ: S.ref(ColumnSchemaID.READ),
  CREATE: S.ref(ColumnSchemaID.CREATE),
  UPDATE: S.ref(ColumnSchemaID.UPDATE),
};
