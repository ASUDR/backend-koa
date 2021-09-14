import Joi from 'joi';

export const signInSchema = Joi.object().keys({
  id: Joi.number().integer().min(0),

  password: Joi.string()
    .min(8)
    .max(64)
    .required()
});
