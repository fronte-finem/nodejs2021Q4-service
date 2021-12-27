import S, { ExtendedSchema } from 'fluent-json-schema';
import { uuidKey } from '~src/openaip/keys';
import { ColumnSchemaID } from './column.schema';

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

/**
 * Set of JSON-Schemas for partial forms of {@link BoardDTO} for different API operations
 */
export const BoardSchema: Readonly<Record<string, ExtendedSchema>> = {
  READ: S.object()
    .id(BoardSchemaID.READ)
    .prop(BoardField.ID, uuidKey)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(S.ref(ColumnSchemaID.READ)))
    .additionalProperties(false),

  CREATE: S.object()
    .id(BoardSchemaID.CREATE)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(S.ref(ColumnSchemaID.CREATE)))
    .additionalProperties(false)
    .required(createFields),

  UPDATE: S.object()
    .id(BoardSchemaID.UPDATE)
    .prop(BoardField.ID, uuidKey)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(S.ref(ColumnSchemaID.UPDATE)))
    .additionalProperties(false)
    .required(createFields),
};
