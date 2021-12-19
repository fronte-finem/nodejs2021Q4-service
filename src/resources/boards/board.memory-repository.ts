import { IDBRepository, MemoryRepository } from '~src/common/memory-repository';
import { Board } from './board.model';

export const boardsRepo: IDBRepository<Board> = new MemoryRepository<Board>();
