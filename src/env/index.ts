import { getEnvSafely } from './config';

const ACCESS_TOKEN_SECRET = getEnvSafely('ACCESS_TOKEN_SECRET');
const REFRESH_TOKEN_SECRET = getEnvSafely('REFRESH_TOKEN_SECRET');
const NODE_ENV = getEnvSafely('NODE_ENV');

const env = {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  NODE_ENV,
};

export default env;