import { getAllTags } from './repository'
import { ITag } from '@/types'

export const getAllTagsService = async (userId: number): Promise<ITag[] | null> => {
  return await getAllTags(userId)
}
