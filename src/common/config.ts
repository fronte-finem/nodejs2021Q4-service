import { resolve } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

export const ROOT_PATH: string = resolve(
  fileURLToPath(import.meta.url),
  '../..'
);

dotenv.config({
  path: resolve(ROOT_PATH, '.env'),
});

export const IS_PROD: boolean = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

export const PORT = Number(process.env.PORT || 5000);

export const MONGO_CONNECTION_STRING: string =
  process.env.MONGO_CONNECTION_STRING || '';

export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || '';

export const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';
