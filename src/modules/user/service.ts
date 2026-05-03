import { findUserById } from './repository'
import { IUserResponse } from '@/types'
import ApiErrors from '@/error/ApiErrors'

export const profileService = async (userId: number): Promise<IUserResponse> => {
  const user = await findUserById(userId)

  if (!user) {
    throw new ApiErrors('User not found', 404)
  }

  return user
}
