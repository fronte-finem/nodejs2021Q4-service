import 'reflect-metadata';
import {
  Column as ColumnField,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardDTO, ColumnDTO, TaskDTO } from '../dto-types';

@Entity({ orderBy: { order: 'DESC' } })
export class Column implements ColumnDTO {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ColumnField()
  public title: string;

  @ColumnField()
  public order: number;

  @ColumnField('uuid', { nullable: true })
  public boardId: string | null = null;

  @ManyToOne('Board', 'columns', { onDelete: 'CASCADE' })
  @JoinColumn()
  public board?: BoardDTO;

  @OneToMany('Task', 'column', { cascade: true })
  public tasks?: TaskDTO[];

  constructor({ title, order }: Partial<ColumnDTO> = {}) {
    this.title = title ?? 'Backlog';
    this.order = order ?? 1;
  }
}
