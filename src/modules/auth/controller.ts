import { NextFunction, Request, Response } from 'express'
import { loginService, registerService } from './service'
import { IUser } from '@/types'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = {
        email: req.body?.email || '',
        password: req.body?.password || '',
      }
      const result = await loginService(userData)

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData: IUser = {
        email: req.body?.email || '',
        username: req.body?.username || '',
        password: req.body?.password || '',
      }
      const result = await registerService(userData)

      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController()
