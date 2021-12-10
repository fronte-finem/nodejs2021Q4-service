import { IDBRepository } from '~src/common/memory-repository';
import { Column } from '~src/resources/boards/column.model';
import { tasksService } from '~src/resources/tasks/task.service';
import { Maybe } from '~src/common/types';
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

  public async create({
    columns = [],
    ...boardDTO
  }: Partial<BoardDTO>): Promise<Maybe<BoardDTO>> {
    const board = new Board({
      ...boardDTO,
      columns: columns.map((columnDTO) => new Column(columnDTO)),
    });
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
    { columns = [], ...boardDTO }: Partial<BoardDTO>
  ): Promise<Maybe<BoardDTO>> {
    const board = new Board({
      id,
      ...boardDTO,
      columns: columns.map((columnDTO) => new Column(columnDTO)),
    });
    return this.repo.update(id, board);
  }
}

export const boardsService = new BoardsService(boardsRepo);
