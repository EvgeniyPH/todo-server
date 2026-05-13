import { Request, Response, NextFunction } from 'express'
import ApiErrors from '../error/ApiErrors'

export const errorHandlingMiddleware = (
  err: Error | ApiErrors,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiErrors) {
    console.log(err.message)
    return res.status(err.statusCode).json({ message: err.message })
  }

  console.log(err)
  return res.status(500).json({ message: 'Internal Server Error' })
}
