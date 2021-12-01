import { resolve } from 'path';
import dotenv from 'dotenv';
import { ROOT_PATH } from '../../root.js';

dotenv.config({
  path: resolve(ROOT_PATH, '.env'),
});

export const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } =
  process.env;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
