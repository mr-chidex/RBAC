import Joi from 'joi';

import { IBlog } from '../models';

export const validateBlogParams = (params: IBlog) => {
  return Joi.object({
    title: Joi.string().trim().required(),
    excerpt: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  }).validate(params);
};
