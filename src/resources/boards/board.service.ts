import { tasksService } from 'resources/tasks/task.service';
import { IDBRepository } from 'common/memory-repository';
import { Maybe } from 'types/common';
import { boardsRepo } from './board.memory-repository';
import { Board, BoardDTO } from './board.model';

class BoardsService {
  constructor(private readonly repo: IDBRepository<Board>) {}

  public async readAll(): Promise<BoardDTO[]> {
    return this.repo.read();
  }

  public async read(id: string): Promise<Maybe<BoardDTO>> {
    return this.repo.read(id);
  }

  public async create(boardDTO: Partial<BoardDTO>): Promise<Maybe<BoardDTO>> {
    const board = new Board(boardDTO);
    return this.repo.create(board);
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    if (deleted) {
      await tasksService.deleteByBoardId(id);
    }
    return deleted;
  }

  public async update(
    id: string,
    boardDTO: Partial<BoardDTO>
  ): Promise<Maybe<BoardDTO>> {
    const board = new Board({ id, ...boardDTO });
    return this.repo.update(id, board);
  }
}

export const boardsService = new BoardsService(boardsRepo);
