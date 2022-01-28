import { Task } from '../../task/entities/task.entity';

export class User {
  id!: string;
  name!: string;
  login!: string;
  password!: string;
  tasks?: Task[];
}
