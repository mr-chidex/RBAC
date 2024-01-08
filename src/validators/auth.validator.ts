import Joi from 'joi';

import { ILogin, IUser } from '../models';

export const validateRegisterParams = (registerParams: IUser) => {
  return Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().required().email().normalize(),
    password: Joi.string().min(5).trim().required(),
  }).validate(registerParams);
};

export const validateLoginParams = (loginParams: ILogin) => {
  return Joi.object({
    email: Joi.string().required().email().normalize(),
    password: Joi.string().trim().required(),
  }).validate(loginParams);
};
