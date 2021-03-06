import Joi from 'joi';
import { routerExceptionsCatcher } from './exceptionCatchers';
import {
  Context, Next,
  ApiValidationError, signInSchema
} from '..';

export default class Validator {
  @routerExceptionsCatcher
  public static async signInValidator(ctx: Context, next: Next): Promise<void> {
    const validateResult: Joi.ValidationResult = await signInSchema.validate(ctx.request.body);
    if (validateResult.error) {
      throw new ApiValidationError(validateResult.error?.message);
    }
    await next();
  }
}
