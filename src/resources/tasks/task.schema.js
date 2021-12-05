import S from 'fluent-json-schema';
import { foreignKey, uuidKey } from '../../common/schemas.types.js';

const TaskField = Object.freeze({
  ID: 'id',
  TITLE: 'title',
  ORDER: 'order',
  DESCRIPTION: 'description',
  USER_ID: 'userId',
  BOARD_ID: 'boardId',
  COLUMN_ID: 'columnId',
});

export const TaskSchemaID = Object.freeze({
  READ: 'TaskRead',
  CREATE: 'TaskCreate',
  UPDATE: 'TaskUpdate',
});

const TaskBaseSchema = S.object()
  .id(TaskSchemaID.READ)
  .additionalProperties(false)
  .prop(TaskField.ID, uuidKey)
  .prop(TaskField.TITLE, S.string())
  .prop(TaskField.ORDER, S.number())
  .prop(TaskField.DESCRIPTION, S.string())
  .prop(TaskField.USER_ID, foreignKey)
  .prop(TaskField.BOARD_ID, foreignKey)
  .prop(TaskField.COLUMN_ID, foreignKey);

export const TaskSchema = Object.freeze({
  READ: S.object()
    .id(TaskSchemaID.READ)
    .extend(TaskBaseSchema.required([TaskField.TITLE])),

  CREATE: S.object()
    .id(TaskSchemaID.CREATE)
    .extend(
      TaskBaseSchema.required([
        TaskField.TITLE,
        TaskField.ORDER,
        TaskField.BOARD_ID,
      ])
    ),

  UPDATE: S.object()
    .id(TaskSchemaID.UPDATE)
    .extend(TaskBaseSchema.required([TaskField.ORDER, TaskField.BOARD_ID])),
});

export const TaskSchemaRef = Object.freeze({
  READ: S.ref(TaskSchemaID.READ),
  CREATE: S.ref(TaskSchemaID.CREATE),
  UPDATE: S.ref(TaskSchemaID.UPDATE),
});
