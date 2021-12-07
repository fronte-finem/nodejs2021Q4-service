import { tasksService } from 'resources/tasks/task.service';
import { IDBRepository } from 'common/memory-repository';
import { Maybe } from 'types/common';
import { usersRepo } from './user.memory-repository';
import { User, UserDTO, UserDTOResponse } from './user.model';

class UsersService {
  constructor(private readonly repo: IDBRepository<User>) {}

  public async readAll(): Promise<UserDTOResponse[]> {
    const users = await this.repo.read();
    return users.map(User.toResponse);
  }

  public async read(id: string): Promise<Maybe<UserDTOResponse>> {
    const maybeUser = await this.repo.read(id);
    return maybeUser && User.toResponse(maybeUser);
  }

  public async create(
    userDTO: Partial<UserDTO>
  ): Promise<Maybe<UserDTOResponse>> {
    const user = new User(userDTO);
    const maybeUser = await this.repo.create(user);
    return maybeUser && User.toResponse(maybeUser);
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    if (deleted) {
      await tasksService.unassignUser(id);
    }
    return deleted;
  }

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
