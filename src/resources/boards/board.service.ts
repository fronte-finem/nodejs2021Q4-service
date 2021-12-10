import { IDBRepository } from '~src/common/memory-repository';
import { Column } from '~src/resources/boards/column.model';
import { tasksService } from '~src/resources/tasks/task.service';
import { Maybe } from '~src/common/types';
import { boardsRepo } from './board.memory-repository';
import { Board, BoardDTO } from './board.model';

/**
 * Service for work with {@link Board}s repository
 */
class BoardsService {
  /**
   * Build service with injected repository
   * @param repo - instance of repository for {@link Board} records
   * @returns instance of {@link BoardsService}
   */
  constructor(private readonly repo: IDBRepository<Board>) {}

  /**
   * Find all {@link Board} records
   * @returns promise with array of {@link BoardDTO} records
   */
  public async readAll(): Promise<BoardDTO[]> {
    return this.repo.read();
  }

  /**
   * Find {@link Board} record by string ID
   * @param id - identification string
   * @returns promise with {@link Maybe} found {@link BoardDTO} record
   */
  public async read(id: string): Promise<Maybe<BoardDTO>> {
    return this.repo.read(id);
  }

  /**
   * Create and save {@link Board} record
   * @param boardDTO - input partial form of {@link BoardDTO}
   * @returns promise with {@link Maybe} created {@link BoardDTO} record
   */
  public async create({
    columns = [],
    ...restFields
  }: Partial<BoardDTO>): Promise<Maybe<BoardDTO>> {
    const board = new Board({
      ...restFields,
      columns: columns.map((columnDTO) => new Column(columnDTO)),
    });
    return this.repo.create(board);
  }

  /**
   * Remove {@link Board} record by string ID
   * @param id - identification string
   * @returns promise with boolean answer about operation status
   */
  public async delete(id: string): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    if (deleted) {
      await tasksService.deleteByBoardId(id);
    }
    return deleted;
  }

  /**
   * Update and save {@link Board} record by string ID
   * @param id - identification string
   * @param boardDTO - input partial form of {@link BoardDTO}
   * @returns promise with {@link Maybe} updated {@link BoardDTO} record
   */
  public async update(
    id: string,
    { columns = [], ...restFields }: Partial<BoardDTO>
  ): Promise<Maybe<BoardDTO>> {
    const board = new Board({
      id,
      ...restFields,
      columns: columns.map((columnDTO) => new Column(columnDTO)),
    });
    return this.repo.update(id, board);
  }
}

export const boardsService = new BoardsService(boardsRepo);
