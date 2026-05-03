import models from '@/database'
import { UserModel } from '@/database/models/user.model'

import { IUser } from '@/types'

export const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  return await models.Users.findOne({ where: { email } })
}

export const createUser = async (userData: IUser): Promise<UserModel> => {
  return await models.Users.create(userData)
}
