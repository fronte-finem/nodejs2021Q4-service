import { PORT } from './common/config';
import { app } from './app';
import { getErrorMessage } from './common/get-error-message';

app
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => app.log.info(`App is running (^_^)`))
  .catch((error) => {
    app.log.fatal(getErrorMessage(error));
    process.exit(1);
  });
