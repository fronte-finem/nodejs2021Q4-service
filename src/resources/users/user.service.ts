import { DeleteResult, getRepository, Repository, UpdateResult } from 'typeorm';
import { Maybe } from '../../common/types';
import { UserDTO, UserDTOResponse } from '../dto-types';
import { User } from './user.model';

/**
 * Service for work with {@link User}s repository
 */
export abstract class UsersService {
  private static get repo(): Repository<User> {
    return getRepository(User);
  }

  /**
   * Find all {@link User} records
   * @returns promise with array of {@link UserDTOResponse} records
   */
  public static async readAll(): Promise<UserDTOResponse[]> {
    const users = await this.repo.find();
    return users.map(User.toResponse);
  }

  /**
   * Find {@link User} record by string ID
   * @param id - identification string
   * @returns promise with {@link Maybe} found {@link UserDTOResponse} record
   */
  public static async read(id: string): Promise<Maybe<UserDTOResponse>> {
    const maybeUser = await this.repo.findOne(id);
    return maybeUser && User.toResponse(maybeUser);
  }

  /**
   * Create and save {@link User} record
   * @param userDTO - input partial form of {@link UserDTO}
   * @returns promise with created {@link UserDTOResponse} record
   */
  public static async create(
    userDTO: Partial<UserDTO>
  ): Promise<Maybe<UserDTOResponse>> {
    const user = this.repo.create(userDTO);
    await this.repo.insert(user);
    return User.toResponse(user);
  }

  /**
   * Remove {@link User} record by string ID
   * @param id - identification string
   * @returns promise with boolean answer about operation status
   */
  public static async delete(id: string): Promise<boolean> {
    const { affected }: DeleteResult = await this.repo.delete(id);
    return Boolean(affected);
  }

  /**
   * Update and save {@link User} record by string ID
   * @param id - identification string
   * @param userDTO - input partial form of {@link UserDTO}
   * @returns promise with {@link Maybe} updated {@link UserDTO} record
   */
  public static async update(
    id: string,
    userDTO: Partial<UserDTO>
  ): Promise<Maybe<UserDTOResponse>> {
    const { affected }: UpdateResult = await this.repo.update(id, userDTO);
    return affected ? this.read(id) : undefined;
  }
}
