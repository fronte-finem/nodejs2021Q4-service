import S, { ExtendedSchema } from 'fluent-json-schema';
import { uuidKey } from '~src/openaip/keys';
import { ColumnSchemaRef } from './column.schema';

const enum BoardField {
  ID = 'id',
  TITLE = 'title',
  COLUMNS = 'columns',
}

export const enum BoardSchemaID {
  READ = 'BoardRead',
  CREATE = 'BoardCreate',
  UPDATE = 'BoardUpdate',
}

const createFields = [BoardField.TITLE, BoardField.COLUMNS];

export const BoardSchema: Readonly<Record<string, ExtendedSchema>> = {
  READ: S.object()
    .id(BoardSchemaID.READ)
    .prop(BoardField.ID, uuidKey)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(ColumnSchemaRef.READ))
    .additionalProperties(false),

  CREATE: S.object()
    .id(BoardSchemaID.CREATE)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(ColumnSchemaRef.CREATE))
    .additionalProperties(false)
    .required(createFields),

  UPDATE: S.object()
    .id(BoardSchemaID.UPDATE)
    .prop(BoardField.ID, uuidKey)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(ColumnSchemaRef.UPDATE))
    .additionalProperties(false)
    .required(createFields),
};
