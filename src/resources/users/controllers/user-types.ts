import { RequestGenericInterface } from 'fastify';
import { UserDTO } from '../user.model';

export const PARAM_USER_ID = 'userId';

export interface IUserRequest extends RequestGenericInterface {
  Params: {
    [PARAM_USER_ID]: string;
  };
  Body: Partial<UserDTO>;
}
