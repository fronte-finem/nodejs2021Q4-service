import { RequestGenericInterface } from 'fastify';
import { UserDTO } from '../../dto-types';

export const PARAM_USER_ID = 'userId';

export interface IUserRequest extends RequestGenericInterface {
  Params: {
    [PARAM_USER_ID]: string;
  };
  Body: Partial<UserDTO>;
}
