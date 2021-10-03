import { BaseApiError } from '..';
import { Context } from '../../..';

interface BaseResponse {
  success: boolean;
  statusCode: number;
}

interface SuccessResponse extends BaseResponse {
  data?: any;
}

interface ErrorResponse extends BaseResponse {
  error?: BaseApiError;
}

class ResponseData implements SuccessResponse, ErrorResponse {
  public error?: BaseApiError;

  constructor(
    public success: boolean,
    public statusCode: number,
    public data?: object
  ) {
    if (this.data instanceof BaseApiError) {
      this.error = this.data;
      delete this.data;
    }
  }
}

export default class Response {
  constructor(
    private ctx: Context,
    private success: boolean,
    private data?: object,
    private statusCode: number = data instanceof BaseApiError && data.httpStatusCode
      ? data.httpStatusCode
      : 200
  ) {
    if (data instanceof BaseApiError) {
      delete data.httpStatusCode;
    }

    this.ctx.body = new ResponseData(
      this.success, this.statusCode, this.data
    );
    this.ctx.status = this.statusCode;
  }
}
