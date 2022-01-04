import { BaseModel, RecordWithId } from '../../common/types';

export interface UserDTO extends RecordWithId {
  readonly name: string;
  readonly login: string;
  readonly password: string;
}

export type UserDTOResponse = Omit<UserDTO, 'password'>;

/**
 * Model for user record
 */
export class User extends BaseModel implements UserDTO {
  public readonly name: string;
  public readonly login: string;
  public readonly password: string;

  /**
   * Create user record
   * @param userDTO - partial form of {@link UserDTO}
   * @returns instance of {@link User}
   */
  constructor({ id, name, login, password }: Partial<UserDTO> = {}) {
    super(id);
    this.name = name ?? 'User';
    this.login = login ?? 'user';
    this.password = password ?? 'P@55w0rd';
  }

  /**
   * Transform {@link User} record to {@link UserDTO} excluding password field
   * @param user - instance of {@link User} record
   * @returns partial form of {@link UserDTO} without password field
   */
  public static toResponse({ id, name, login }: User): UserDTOResponse {
    return { id, name, login };
  }
}
