import { Column } from '../../column/entities/column.entity';
import { Task } from '../../task/entities/task.entity';

export class Board {
  public id!: string;
  public title!: string;
  public columns?: Column[];
  public tasks?: Task[];
}
