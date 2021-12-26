import { PORT } from './common/config';
import { app } from './app';

app.listen(PORT, (err) => {
  app.log.info(`App is running (^_^)`);

  app.log.trace('test env LOG_LEVEL = ALL');
  app.log.debug('test env LOG_LEVEL = ALL');
  app.log.info('test env LOG_LEVEL = INFO');
  app.log.warn('test env LOG_LEVEL = WARN');
  app.log.error('test env LOG_LEVEL = ERROR');
  app.log.fatal('test env LOG_LEVEL = ERROR');

  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
