import config from '@/config/config'
import ApiErrors from '@/error/ApiErrors'
import { verifyJWT } from '@/utils/jwtUtils'
import { NextFunction, Response } from 'express'
import { IRequestPayload } from '@/types'

const decodeToken = async (token: string | undefined) => {
  if (!token) {
    throw new ApiErrors('Authorization header missing', 401)
  }

  const payload = await verifyJWT(token, config.jwtSecretKey)

  return payload
}

export const authMiddleware = async (req: IRequestPayload, res: Response, next: NextFunction) => {
  const { method, path } = req

  if (method === 'OPTIONS' || ['/api/auth/login', '/api/auth/register'].includes(path)) {
    return next()
  }

  try {
    const authHeader = req.header('Authorization') || req.header('authorization')
    const payload = await decodeToken(authHeader)

    if (!payload) {
      throw new ApiErrors('Unauthorized access token', 401)
    }

    req.payload = payload

    next()
  } catch (error: any) {
    next(new ApiErrors(error.message, 401))
  }
}
