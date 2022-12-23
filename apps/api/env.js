// env.js

import dotenv from 'dotenv';

export function loadEnv() {
  let envFile = '.env';

  if (process.env.NODE_ENV === 'staging') {
    envFile = '.env.staging';
  } else if (process.env.NODE_ENV === 'prod') {
    envFile = '.env.prod';
  }

  dotenv.config({ path: envFile });
}
