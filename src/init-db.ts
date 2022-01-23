import 'reflect-metadata';
import { lookup } from 'dns';
import { promisify } from 'util';
import { Connection, createConnection } from 'typeorm';
import { getErrorMessage } from './common/get-error-message';
import { DB_HOST, DB_PORT, ormConfig } from './common/ormconfig';
import { logger } from './logging/logger';

export const initDB = async (): Promise<Connection | undefined> => {
  try {
    logger.info('Connecting to database... ᓚᘏᗢ');
    const dbConnection: Connection = await createConnection(ormConfig);
    const { address } = await promisify(lookup)(DB_HOST);
    logger.info(`Connected to database at ${address}:${DB_PORT} (^_^)`);
    return dbConnection;
  } catch (error) {
    logger.error("Can't connect to database (T_T)");
    logger.error(getErrorMessage(error));
    return undefined;
  }
};
