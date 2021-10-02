import { BaseApiError } from '..';

interface BaseApiSchema {
  success: boolean;
  data?: any;
  error?: BaseApiError;
}

export default BaseApiSchema;
