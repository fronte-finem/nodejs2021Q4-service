import { lookup } from 'dns';
import { promisify } from 'util';
import { Client } from 'pg';
import { appConfig, dbConfig } from './common/config';
import { getErrorMessage } from './common/get-error-message';
import { app } from './app';

const runApp = async (): Promise<void> => {
  const dbClient = new Client(dbConfig);

  try {
    app.log.info('Connecting to database... ᓚᘏᗢ');
    await dbClient.connect();
    const { address } = await promisify(lookup)(dbConfig.host as string);
    app.log.info(`Connected to database at ${address}:${dbConfig.port} (^_^)`);
  } catch (error) {
    app.log.error("Can't connect to database (T_T)");
    app.log.error(getErrorMessage(error));
  }

  try {
    app.log.info('Running app... ᓚᘏᗢ');
    await app.listen(appConfig);
    app.log.info('App is running (^_^)');
  } catch (error) {
    app.log.fatal(getErrorMessage(error));
    try {
      await dbClient.end();
    } catch (dbDisconnectError) {
      app.log.error(getErrorMessage(dbDisconnectError));
    } finally {
      process.exit(1);
    }
  }
};

runApp().then(null);
