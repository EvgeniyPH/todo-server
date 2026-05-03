import models from '@/database'
import { UserModel } from '@/database/models/user.model'

export const findUserById = async (id: number): Promise<UserModel | null> => {
  return await models.Users.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    where: { id },
  })
}
