import { createTodo, getAllTodos } from './repository'
import { ITodoResponse, ITodo, TodoFilterParams, IRequestPayload } from '@/types'
import { validateTodo } from './validator'
import ApiErrors from '@/error/ApiErrors'

export const createTodoService = async (
  request: IRequestPayload,
): Promise<ITodoResponse | null> => {
  const todoData: ITodo = {
    ...request.body,
    userId: request.payload?.userId as number,
    completed: false,
  }
  todoData.tags?.map(tag => (tag.userId = todoData.userId))

  const { error } = validateTodo(todoData)

  if (error) {
    throw new ApiErrors(error.message, 400)
  }

  const newTodo = await createTodo(todoData)

  return newTodo
}

export const getAllTodosService = async (
  request: IRequestPayload,
): Promise<{ rows: ITodoResponse[]; count: number }> => {
  const params: TodoFilterParams = { ...request.query, userId: request.payload?.userId }

  switch (request.query.status as string) {
    case 'completed':
      params.completed = true
      break
    case 'active':
      params.completed = false
      break
  }

  return await getAllTodos(params)
}
