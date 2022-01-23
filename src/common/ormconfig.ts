import { ConnectionOptions } from 'typeorm';
import { logger } from '../logging/logger';
import { TypeormPinoLoggerWrapper } from '../logging/typeorm-logger';
import { Board } from '../resources/boards/board.model';
import { Column } from '../resources/column/column.model';
import { Task } from '../resources/tasks/task.model';
import { User } from '../resources/users/user.model';
import { LOCALHOST } from './config';

export const DB_HOST = process.env.DB_HOST ?? LOCALHOST;
export const DB_PORT = Number(process.env.DB_PORT) || 5432;

const MIGRATIONS_DIR = 'src/migrations';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: process.env.DB_USER ?? 'admin',
  password: process.env.DB_PASSWORD ?? 'secret password',
  database: process.env.DB_NAME ?? 'app_db',
  logging: true,
  logger: new TypeormPinoLoggerWrapper(logger),
  entities: [User, Column, Board, Task],
  synchronize: false,
  migrations: [`${MIGRATIONS_DIR}/*.ts`],
  migrationsRun: true,
  cli: { migrationsDir: MIGRATIONS_DIR },
};

export default ormConfig;
