import { RedisOptions } from 'koa-redis';

const options: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT!,
  password: process.env.REDIS_PASSWORD
};

export default options;
