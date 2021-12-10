// import dotenv from 'dotenv';
// import { resolve } from 'path';
// import { ROOT_PATH } from '../../.root.config.mjs';

// dotenv.config({
//   path: resolve(ROOT_PATH, '.env'),
// });

export const IS_PROD: boolean = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;

export const PORT = Number(process.env.PORT || 5000);

export const MONGO_CONNECTION_STRING: string =
  process.env.MONGO_CONNECTION_STRING || '';

export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || '';

export const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';
