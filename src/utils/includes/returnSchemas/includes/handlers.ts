import { logger, Context } from '../../..';
import BaseApiError from './baseApiError';

export const handleApiError = (err: BaseApiError, source: string, ctx: Context) => {
  console.error(err);
  logger.error(err);
  ctx.response.status = err.httpStatusCode;
  ctx.body = err;
};
