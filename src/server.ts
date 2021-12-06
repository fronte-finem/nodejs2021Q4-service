import { PORT } from 'common/config';
import { app } from 'app';

app.listen(PORT, (err) => {
  app.log.info(`App is running (^_^)`);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
