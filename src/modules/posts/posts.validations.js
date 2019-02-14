import Joi from 'joi'

export default {
  post: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      text: Joi.string()
        .min(10)
        .required(),
      likes: Joi.number()
        .default(0)
        .required(),
    },
  },
}
