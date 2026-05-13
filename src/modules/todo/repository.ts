import sequelize, { Op } from 'sequelize'
import models from '@/database'
import { TodoModel } from '@/database/models/todo.model'
import { ITodo, ITag, TodoFilterParams } from '@/types'

export const getAllTodos = async (
  params: TodoFilterParams,
): Promise<{ rows: TodoModel[]; count: number }> => {
  const where: Record<string, number | string | boolean | object> = {
    userId: params.userId,
  }
  if (params.title) {
    where.title = {
      [Op.like]: `%${params.title}%`,
    }
  }
  if (params.completed !== undefined) {
    where.completed = params.completed
  }

  return await models.Todos.findAndCountAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    where,
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

export const deleteTodo = async (id: number, userId: number): Promise<number> => {
  return await models.Todos.destroy({
    where: { id: id, userId: userId },
  })
}

export const toggleCompleteTodo = async (
  id: number,
  userId: number,
  completed: boolean,
): Promise<[number]> => {
  return await models.Todos.update(
    { completed: completed },
    {
      where: { id: id, userId: userId },
    },
  )
}

export const countTotals = async (userId: number) => {
  return await models.Todos.findOne({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('id')), 'totalTodo'],
      [
        sequelize.fn('SUM', sequelize.literal('CASE WHEN "completed" = true THEN 1 ELSE 0 END')),
        'totalCompleted',
      ],
    ],
    where: { userId: userId },
  })
}
