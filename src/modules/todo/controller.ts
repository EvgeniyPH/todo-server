import ApiErrors from '@/error/ApiErrors'
import { NextFunction, Response } from 'express'
import {
  createTodoService,
  getAllTodosService,
  deleteTodoService,
  toggleTodoService,
  countTodoTotalsService,
} from './service'
import { IRequestPayload } from '@/types'
import { ITodo } from '@/types'

class TodoController {
  constructor() {}

  /**
   * Get all todos
   * @param req IRequestPayload
   * @param res Response
   * @param next NextFunction
   * @returns void
   */
  async getAllTodos(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      const result = await getAllTodosService(req)

      res.status(201).json({
        todos: result,
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a new todo
   * @param req IRequestPayload
   * @param res Response
   * @param next NextFunction
   * @returns void
   */
  async createTodo(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      const result = await createTodoService(req)

      res.status(201).json({
        todo: result,
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteTodo(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      await deleteTodoService(req)

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async toggleTodo(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      await toggleTodoService(req)

      res.status(204).json()
    } catch (error) {
      next(error)
    }
  }

  async countTotals(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      const result = await countTodoTotalsService(req)

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new TodoController()
