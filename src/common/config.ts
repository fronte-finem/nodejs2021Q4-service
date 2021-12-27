export const {
  PORT = '5000',
  NODE_ENV = 'development',
  MONGO_CONNECTION_STRING = 'mongo connection string',
  JWT_SECRET_KEY = 'JWT secret key',
  AUTH_MODE = 'false',
} = process.env;

export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;
export const IS_AUTH_MODE = AUTH_MODE === 'true';
