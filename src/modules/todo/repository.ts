import models from '@/database'
import { TodoModel } from '@/database/models/todo.model'
import { ITodo, ITag } from '@/types'

export const getAllTodos = async (userId: number): Promise<{ rows: TodoModel[]; count: number }> => {
  return await models.Todos.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where: { userId: userId },
    distinct: true,
    include: {
      model: models.Tags,
      as: 'tags',
    },
  })
}

export const findTodoById = async (id: number, userId: number): Promise<TodoModel | null> => {
  return await models.Todos.findOne({
    where: { id: id, userId: userId },
    include: {
      model: models.Tags,
      as: 'tags',
    },
  })
}

export const createTodo = async (todoData: ITodo): Promise<TodoModel | null> => {
  const newTags: ITag[] = []
  const tagIds: number[] = []

  if (todoData.tags) {
    todoData.tags.forEach(tag => {
      if (tag.id) {
        tagIds.push(tag.id)
      } else {
        newTags.push(tag)
      }
    })
  }

  const newTodo = await models.Todos.create(
    { ...todoData, tags: newTags },
    {
      include: {
        model: models.Tags,
        as: 'tags',
      },
    },
  )

  if (tagIds) {
    await newTodo.addTags(tagIds)
  }

  return newTodo.reload()
}
