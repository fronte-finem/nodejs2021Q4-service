import { PORT } from './common/config.js';
import { app } from './app.js';

app.listen(PORT, (err, address) => {
  console.log(`App is running on ${address}`);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
