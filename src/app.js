import { resolve } from 'path';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import { userRouter } from './resources/users/user.router.js';
import { ROOT_PATH } from '../root.js';

export const app = express();

const swaggerDocument = YAML.load(resolve(ROOT_PATH, 'doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
