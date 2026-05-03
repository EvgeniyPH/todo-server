import ApiErrors from '@/error/ApiErrors'
import { NextFunction, Response } from 'express'
import { createTodoService, getAllTodosService } from './service'
import { IRequestPayload } from '@/types'
import { ITodo } from '@/types'

class TodoController {
  constructor() {}

  async getAllTodos(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      const result = await getAllTodosService(req.payload.userId)

      res.status(201).json({
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }

  async createTodo(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      const todoData: ITodo = {
        title: req.body?.title || '',
        description: req.body?.description || '',
        priority: req.body?.priority || '',
        dueDate: req.body?.dueDate || '',
        userId: req.payload.userId,
        completed: false,
        tags: req.body?.tags || [],
      }
      const result = await createTodoService(todoData)

      res.status(201).json({
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new TodoController()
