import { NextFunction, Response } from 'express'
import { profileService } from './service'
import { IRequestPayload } from '@/types'

class UserController {
  async profile(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        res.status(404).json({ message: 'User not found' })
        return
      }

      const userId = req.payload.userId
      const result = await profileService(userId)

      res.status(200).json({ data: result })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
