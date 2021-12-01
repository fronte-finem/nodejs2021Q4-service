import { v4 as uuidv4 } from 'uuid';

/**
 * @typedef { {name:string; login: string} } UserBase
 */ /**
 * @typedef { {id:string} } WithID
 */ /**
 * @typedef { {password:string} } WithPassword
 */ /**
 * @typedef { UserBase & WithID } UserDTO
 */ /**
 * @typedef { UserBase & WithPassword } NewUserDTO
 */

export class User {
  /**
   * @param { NewUserDTO | User } user
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * @param { User } user
   * @return { UserDTO }
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
