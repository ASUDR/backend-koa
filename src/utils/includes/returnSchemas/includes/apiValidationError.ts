import { httphttpStatusCodes } from '../../..';
import BaseApiError from './baseApiError';

export default class ApiValidationError extends BaseApiError {
  constructor(
    description: string = 'Validation failed',
    httpStatusCode: number = httphttpStatusCodes.BAD_REQUEST
  ) {
    super(description, httpStatusCode);
  }
}
