import { httphttpStatusCodes } from '../../..';

export default class BaseApiError extends Error {
  constructor(
    public description: string = 'Unknown error',
    public code: number,
    public httpStatusCode: number = httphttpStatusCodes.BAD_REQUEST
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
