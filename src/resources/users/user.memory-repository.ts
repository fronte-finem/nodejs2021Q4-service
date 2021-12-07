import { IDBRepository, MemoryRepository } from 'common/memory-repository';
import { User } from './user.model';

export const usersRepo: IDBRepository<User> = new MemoryRepository();
