import { createTodo, getAllTodos } from './repository'
import { ITodoResponse, ITodo } from '@/types'
import { validateTodo } from './validator'
import ApiErrors from '@/error/ApiErrors'

export const createTodoService = async (todoData: ITodo): Promise<ITodoResponse | null> => {
  const { error, value } = validateTodo(todoData)

  if (error) {
    throw new ApiErrors(error.message, 400)
  }

  const newTodo = await createTodo(value)

  return newTodo
}

export const getAllTodosService = async (userId: number): Promise<{ rows: ITodoResponse[]; count: number }> => {
  return await getAllTodos(userId)
}
