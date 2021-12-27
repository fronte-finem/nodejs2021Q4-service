import { PORT } from './common/config.js';
import { app } from './app.js';

app.listen(PORT, (err) => {
  app.log.info(`App is running (^_^)`);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
