import S, { ExtendedSchema, ObjectSchema } from 'fluent-json-schema';
import { foreignKey, uuidKey } from '../../openaip/constants';

const enum TaskField {
  ID = 'id',
  TITLE = 'title',
  ORDER = 'order',
  DESCRIPTION = 'description',
  USER_ID = 'userId',
  BOARD_ID = 'boardId',
  COLUMN_ID = 'columnId',
}

export const enum TaskSchemaID {
  BASE = 'TaskBase',
  READ = 'TaskRead',
  CREATE = 'TaskCreate',
  UPDATE = 'TaskUpdate',
}

const TaskBaseSchema: ObjectSchema = S.object()
  .id(TaskSchemaID.BASE)
  .prop(TaskField.ID, uuidKey)
  .prop(TaskField.TITLE, S.string())
  .prop(TaskField.ORDER, S.number())
  .prop(TaskField.DESCRIPTION, S.string())
  .prop(TaskField.USER_ID, foreignKey)
  .prop(TaskField.BOARD_ID, foreignKey)
  .prop(TaskField.COLUMN_ID, foreignKey)
  .additionalProperties(false);

/**
 * Set of JSON-Schemas for partial forms of {@link TaskDTO} for different API operations
 */
export const TaskSchema: Readonly<Record<string, ExtendedSchema>> = {
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
};
