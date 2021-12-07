import { BaseModel, RecordWithId } from 'types/common';

export interface UserDTO extends RecordWithId {
  readonly name: string;
  readonly login: string;
  readonly password: string;
}

export class User extends BaseModel implements UserDTO {
  public readonly name: string;
  public readonly login: string;
  public readonly password: string;

  constructor({ id, name, login, password }: Partial<UserDTO> = {}) {
    super(id);
    this.name = name ?? 'User';
    this.login = login ?? 'user';
    this.password = password ?? 'P@55w0rd';
  }

  public static toResponse(user: User): Omit<UserDTO, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
