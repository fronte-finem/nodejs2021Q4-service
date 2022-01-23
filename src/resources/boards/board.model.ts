import 'reflect-metadata';
import {
  Column as ColumnField,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardDTO, ColumnDTO, TaskDTO } from '../dto-types';

@Entity()
export class Board implements BoardDTO {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ColumnField()
  public title: string;

  @OneToMany('Column', 'board', { cascade: true })
  public columns!: ColumnDTO[];

  @OneToMany('Task', 'board', { cascade: true })
  public tasks?: TaskDTO[];

  constructor({ title }: Partial<BoardDTO> = {}) {
    this.title = title ?? 'Autotest';
  }
}
