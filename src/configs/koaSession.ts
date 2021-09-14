import redisStore from 'koa-redis';
import options from './redisStore';

const config = {
  store: redisStore(options),
  key: 'koa.sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  secure: true
};

export default config;
