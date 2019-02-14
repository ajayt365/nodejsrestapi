export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

import Joi from 'joi'

export const joiSchema = {
  signup: {
    body: {
      email: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      password: Joi.string()
        .regex(passwordReg)
        .required(),
      username: Joi.string().required(),
    },
  },
}
