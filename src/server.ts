import { FatalHandler } from './logging/utils';
import { initDB } from './init-db';
import { initApp } from './init-app';

process.on('uncaughtException', FatalHandler.uncaughtException);
process.on('unhandledRejection', FatalHandler.unhandledRejection);

// Promise.reject(new Error('(-_-) reject Oops!')).then(null);
// throw new Error('(x_x) throw Oops!');

const main = async (): Promise<void> => {
  const dbConnection = await initDB();
  if (!dbConnection) {
    process.exit(1);
  }

  const success = await initApp(dbConnection);
  if (!success) {
    process.exit(1);
  }
};

main().then(null);
