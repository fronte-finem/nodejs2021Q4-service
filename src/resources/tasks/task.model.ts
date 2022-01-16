import 'reflect-metadata';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardDTO, ColumnDTO, TaskDTO, UserDTO } from '../dto-types';

@Entity()
export class Task implements TaskDTO {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public title: string;

  @Column()
  public order: number;

  @Column('text')
  public description: string;

  @Column('uuid', { nullable: true })
  public userId: string | null = null;

  @ManyToOne('User', 'tasks', { onDelete: 'SET NULL' })
  @JoinColumn()
  public user?: UserDTO;

  @Column('uuid', { nullable: true })
  public boardId: string | null = null;

  @ManyToOne('Board', 'tasks', { onDelete: 'CASCADE' })
  @JoinColumn()
  public board?: BoardDTO;

  @Column('uuid', { nullable: true })
  public columnId: string | null = null;

  @ManyToOne('Column', 'tasks', { onDelete: 'CASCADE' })
  @JoinColumn()
  public column?: ColumnDTO;

  constructor({ title, order, description }: Partial<TaskDTO> = {}) {
    this.title = title ?? 'Test Task';
    this.order = order ?? 1;
    this.description = description ?? 'Lorem ipsum';
  }
}
