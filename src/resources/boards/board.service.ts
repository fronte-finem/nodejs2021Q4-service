import { DeleteResult, getRepository, Repository } from 'typeorm';
import { Maybe } from '../../common/types';
import { Column } from '../column/column.model';
import { BoardDTO } from '../dto-types';
import { Board } from './board.model';

/**
 * Service for work with {@link Board}s repository
 */
export class BoardsService {
  private static get repo(): Repository<Board> {
    return getRepository(Board);
  }

  /**
   * Find all {@link Board} records
   * @returns promise with array of {@link BoardDTO} records
   */
  public static async readAll(): Promise<BoardDTO[]> {
    return this.repo.find({ relations: ['columns'] });
  }

  /**
   * Find {@link Board} record by string ID and load array related {@link Column}s
   * @param id - identification string
   * @returns promise with {@link Maybe} found {@link BoardDTO} record
   */
  public static async read(id: string): Promise<Maybe<BoardDTO>> {
    return this.repo.findOne(id, { relations: ['columns'] });
  }

  /**
   * Find {@link Board} record by string ID
   * @param id - identification string
   * @returns promise with {@link Maybe} found {@link BoardDTO} record
   */
  public static async check(id: string): Promise<Maybe<BoardDTO>> {
    return this.repo.findOne(id);
  }

  /**
   * Create and save {@link Board} record
   * @param DTO - input partial form of {@link BoardDTO}
   * @returns promise with created {@link BoardDTO} record
   */
  public static async create({
    columns = [],
    ...boardDTO
  }: Partial<BoardDTO>): Promise<Maybe<BoardDTO>> {
    const board = this.repo.create(boardDTO);
    board.columns = columns?.map((columnDTO) => new Column(columnDTO));
    await this.repo.insert(board);
    return board;
  }

  /**
   * Remove {@link Board} record by string ID
   * @param id - identification string
   * @returns promise with boolean answer about operation status
   */
  public static async delete(id: string): Promise<boolean> {
    const { affected }: DeleteResult = await this.repo.delete(id);
    return Boolean(affected);
  }

  /**
   * Update and save {@link Board} record by string ID
   * @param id - identification string
   * @param DTO - input partial form of {@link BoardDTO}
   * @returns promise with {@link Maybe} updated {@link BoardDTO} record
   */
  public static async update(
    id: string,
    { columns = [], ...boardDTO }: Partial<BoardDTO>
  ): Promise<Maybe<BoardDTO>> {
    const board = this.repo.create(boardDTO);
    board.columns = columns?.map((columnDTO) => new Column(columnDTO));

    // Error: Cannot query across one-to-many for property
    // https://github.com/typeorm/typeorm/issues/8363
    // https://github.com/typeorm/typeorm/issues/8404
    // https://stackoverflow.com/questions/70064149/typeorm-cannot-query-across-one-to-many-for-property-error
    //
    // const { affected }: UpdateResult = await this.repo.update(id, board);
    // return affected ? this.read(id) : undefined;

    await this.repo.save({ ...board, id });
    return this.read(id);
  }
}
