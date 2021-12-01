import { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: resolve('.env'),
});

export const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } =
  process.env;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
