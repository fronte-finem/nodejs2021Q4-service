import { IDBRepository, MemoryRepository } from 'common/memory-repository';
import { Task } from './task.model';

export const tasksRepo: IDBRepository<Task> = new MemoryRepository();