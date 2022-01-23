import { UserDTO } from '../resources/dto-types';

export type LoginDTO = Omit<UserDTO, 'id' | 'name'>;

export type PayloadJWT = {
  userId: string;
  login: string;
};
