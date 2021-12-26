import { IDBRepository } from '../../common/memory-repository';
import { Maybe } from '../../common/types';
import { tasksService } from '../tasks/task.service';
import { usersRepo } from './user.memory-repository';
import { User, UserDTO, UserDTOResponse } from './user.model';

/**
 * Service for work with {@link User}s repository
 */
class UsersService {
  /**
   * Build service with injected repository
   * @param repo - instance of repository for {@link User} records
   * @returns instance of {@link UsersService}
   */
  constructor(private readonly repo: IDBRepository<User>) {}

  /**
   * Find all {@link User} records
   * @returns promise with array of {@link UserDTOResponse} records
   */
  public async readAll(): Promise<UserDTOResponse[]> {
    const users = await this.repo.read();
    return users.map(User.toResponse);
  }

  /**
   * Find {@link User} record by string ID
   * @param id - identification string
   * @returns promise with {@link Maybe} found {@link UserDTOResponse} record
   */
  public async read(id: string): Promise<Maybe<UserDTOResponse>> {
    const maybeUser = await this.repo.read(id);
    return maybeUser && User.toResponse(maybeUser);
  }

  /**
   * Create and save {@link User} record
   * @param userDTO - input partial form of {@link UserDTO}
   * @returns promise with {@link Maybe} created {@link UserDTOResponse} record
   */
  public async create(
    userDTO: Partial<UserDTO>
  ): Promise<Maybe<UserDTOResponse>> {
    const user = new User(userDTO);
    const maybeUser = await this.repo.create(user);
    return maybeUser && User.toResponse(maybeUser);
  }

  /**
   * Remove {@link User} record by string ID
   * @param id - identification string
   * @returns promise with boolean answer about operation status
   */
  public async delete(id: string): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    if (deleted) {
      await tasksService.unassignUser(id);
    }
    return deleted;
  }

  /**
   * Update and save {@link User} record by string ID
   * @param id - identification string
   * @param userDTO - input partial form of {@link UserDTO}
   * @returns promise with {@link Maybe} updated {@link UserDTO} record
   */
  public async update(
    id: string,
    userDTO: Partial<UserDTO>
  ): Promise<Maybe<UserDTOResponse>> {
    const user = new User({ id, ...userDTO });
    const maybeUser = await this.repo.update(id, user);
    return maybeUser && User.toResponse(maybeUser);
  }
}

export const usersService = new UsersService(usersRepo);
