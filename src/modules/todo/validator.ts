import Joi from 'joi'
import { ITodo } from '@/types'

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
}

export const validateTodo = (todoData: ITodo) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required().messages({
      'string.min': 'Title should at least minimum 3 character',
      'any.required': 'Title is required',
    }),
    priority: Joi.string()
      .pattern(/^(High|Medium|Low)$/)
      .required()
      .messages({
        'string.pattern.base': 'Priority should be High, Medium or Low',
        'any.required': 'Priority is required',
      }),
    completed: Joi.boolean().required().messages({
      'boolean.required': 'Completed is required',
    }),
    userId: Joi.number().required().messages({
      'number.required': 'User ID is required',
    }),
    dueDate: Joi.date().required().messages({
      'date.required': 'Due date is required',
    }),
    description: Joi.string(),
    tags: Joi.array(),
  })

  return schema.validate(todoData, options)
}

export const validateTodoDeleteParams = (params: { id?: number; userId: number }) => {
  const schema = Joi.object({
    id: Joi.number().required().messages({
      'number.required': 'Todo ID is required',
    }),
    userId: Joi.number().required().messages({
      'number.required': 'User ID is required',
    }),
  })

  return schema.validate(params, options)
}

export const validateTodoToggleParams = (params: {
  id?: number
  userId: number
  completed: boolean
}) => {
  const schema = Joi.object({
    id: Joi.number().required().messages({
      'number.required': 'Todo ID is required',
    }),
    userId: Joi.number().required().messages({
      'number.required': 'User ID is required',
    }),
    completed: Joi.boolean().required().messages({
      'boolean.required': 'Completed is required',
    }),
  })

  return schema.validate(params, options)
}
