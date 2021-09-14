import { httphttpStatusCodes } from '../..';
import BaseApiError from './baseApiError';

export default class ApiNotFoundError extends BaseApiError {
  constructor(
    description: string = 'Not found',
    httpStatusCode: number = httphttpStatusCodes.NOT_FOUND
  ) {
    super(description, httpStatusCode);
  }
}
