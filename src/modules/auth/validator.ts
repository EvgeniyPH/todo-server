import Joi from 'joi'

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
}

export const validateRegister = (userData: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email format is invalid',
      'any.required': 'Email is required',
    }),
    username: Joi.string().min(3).required().messages({
      'string.min': 'Name should at least minimum 3 character',
      'any.required': 'Name is required',
    }),
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).+$'))
      .required()
      .messages({
        'string.min': 'Password must have at least 8 characters.',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.',
      }),
  })

  return schema.validate(userData, options)
}

export const validateLogin = (userData: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email format is invalid',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required(),
  })

  return schema.validate(userData, options)
}
