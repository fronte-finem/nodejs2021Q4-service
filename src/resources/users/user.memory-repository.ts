import { IDBRepository, MemoryRepository } from '~src/common/memory-repository';
import { User } from './user.model';

export const usersRepo: IDBRepository<User> = new MemoryRepository<User>();
