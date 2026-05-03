import models from '@/database'
import { TagModel } from '@/database/models/tag.model'

export const getAllTags = async (userId: number): Promise<TagModel[] | null> => {
  return await models.Tags.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
    where: { userId: userId },
  })
}

export const findTagById = async (id: number, userId: number): Promise<TagModel | null> => {
  return await models.Tags.findOne({
    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
    where: { id: id, userId: userId },
  })
}
