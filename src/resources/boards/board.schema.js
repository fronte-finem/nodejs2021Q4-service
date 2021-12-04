import S from 'fluent-json-schema';
import { ColumnSchemaRef } from './column.schema.js';

const BoardField = Object.freeze({
  ID: 'id',
  TITLE: 'title',
  COLUMNS: 'columns',
});

const createFields = [BoardField.TITLE, BoardField.COLUMNS];

export const BoardSchemaID = Object.freeze({
  READ: 'BoardRead',
  CREATE: 'BoardCreate',
  UPDATE: 'BoardUpdate',
});

export const BoardSchema = Object.freeze({
  READ: S.object()
    .id(BoardSchemaID.READ)
    .additionalProperties(false)
    .prop(BoardField.ID, S.string().format('uuid'))
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(ColumnSchemaRef.READ)),

  CREATE: S.object()
    .id(BoardSchemaID.CREATE)
    .additionalProperties(false)
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(ColumnSchemaRef.CREATE))
    .required(createFields),

  UPDATE: S.object()
    .id(BoardSchemaID.UPDATE)
    .additionalProperties(false)
    .prop(BoardField.ID, S.string().format('uuid'))
    .prop(BoardField.TITLE, S.string())
    .prop(BoardField.COLUMNS, S.array().items(ColumnSchemaRef.UPDATE))
    .required(createFields),
});

export const BoardSchemaRef = Object.freeze({
  READ: S.ref(BoardSchemaID.READ),
  CREATE: S.ref(BoardSchemaID.CREATE),
  UPDATE: S.ref(BoardSchemaID.UPDATE),
});
