import { RequestGenericInterface } from 'fastify';
import { PARAM_BOARD_ID } from '../../boards/controllers/board-types';
import { TaskDTO } from '../../dto-types';

export { PARAM_BOARD_ID } from '../../boards/controllers/board-types';

export const PARAM_TASK_ID = 'taskId';

export interface ITaskRootRequest extends RequestGenericInterface {
  Params: {
    [PARAM_BOARD_ID]: string;
  };
  Body: Partial<TaskDTO>;
}

export interface ITaskRequest extends RequestGenericInterface {
  Params: {
    [PARAM_BOARD_ID]: string;
    [PARAM_TASK_ID]: string;
  };
  Body: Partial<TaskDTO>;
}
