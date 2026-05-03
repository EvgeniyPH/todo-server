import ApiErrors from '@/error/ApiErrors'
import { NextFunction, Response } from 'express'
import { getAllTagsService } from './service'
import { IRequestPayload } from '@/types'

class TagController {
  async getAllTags(req: IRequestPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload) {
        throw new ApiErrors('Access denied', 403)
      }

      const result = await getAllTagsService(req.payload.userId)

      res.status(201).json({
        data: result,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new TagController()
