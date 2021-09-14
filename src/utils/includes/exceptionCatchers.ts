/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Sequelize from 'sequelize';
import { BaseApiError, BaseApiSchema } from '..';
import httphttpStatusCodes from './httpStatusCodes';
import logger from './logger';

const ValidationError = Sequelize.ValidationError;

const defineErrorMessage = (err: Error): string => {
  if (err instanceof ValidationError) {
    return err?.errors[0]?.message || JSON.stringify(err);
  }
  return JSON.stringify(err);
};

const defineErrorCode = (errText: string): number => {
  switch (errText) {
    case '"value" must be of type object':
      return 2101;
    case '"email" is required':
      return 2102;
    case 'email must be unique':
      return 2103;
    case '"email" must be a valid email':
      return 2104;
    case '"password" is required':
      return 2105;
    case '"password" length must be at least 8 characters long':
      return 2106;
    case '"trafficSource" is required':
      return 2107;
    default:
      return 2100;
  }
};

export const exceptionsCatcher = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const method: any = descriptor.value;

  descriptor.value = async (...args: any): Promise<any> => {
    console.log('exceptionsCatcher err');
    try {
      const result: any = await method.apply(target, args);
      return result;
    } catch (err) {
      console.log(err);
      const errText: string = defineErrorMessage(err);
      console.error(`exceptionsCatcher caught error in method [${method.name}]: ${errText}`);
      logger.error(`exceptionsCatcher caught error: ${errText}`);
      return new BaseApiError(errText, defineErrorCode(errText));
    }
  };
};

export const routerExceptionsCatcher = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const method: any = descriptor.value;

  descriptor.value = async (...args: any) => {
    try {
      await method.apply(target, args);
    } catch (err) {
      const [ctx] = args;
      const httpStatusCode: number = err.httpStatusCode || httphttpStatusCodes.BAD_REQUEST;
      const result: BaseApiSchema = {
        success: false,
        error: err
      };
      console.error(`routerExceptionsCatcher caught error in method [${method.name}]: ${err}`);
      logger.error(`routerExceptionsCatcher caught error in method [${method.name}]: ${err}`);
      ctx.response.status = httpStatusCode;
      ctx.body = result;
    }
  };
};
