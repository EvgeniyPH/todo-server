import { createTodo, getAllTodos, deleteTodo, toggleCompleteTodo, countTotals } from './repository'
import { ITodoResponse, ITodo, TodoFilterParams, IRequestPayload } from '@/types'
import { validateTodo, validateTodoDeleteParams, validateTodoToggleParams } from './validator'
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

export const deleteTodoService = async (request: IRequestPayload): Promise<number> => {
  const params: { id?: number; userId: number } = {
    ...request.params,
    userId: request.payload?.userId,
  }

  const { error, value } = validateTodoDeleteParams(params)

  if (error) {
    throw new ApiErrors(error.message, 400)
  }

  return await deleteTodo(value.id, value.userId)
}

export const toggleTodoService = async (request: IRequestPayload): Promise<[number]> => {
  const params: { id?: number; userId: number; completed: boolean } = {
    ...request.params,
    userId: request.payload?.userId,
    completed: request.body?.completed as boolean,
  }

  const { error, value } = validateTodoToggleParams(params)

  if (error) {
    throw new ApiErrors(error.message, 400)
  }

  return await toggleCompleteTodo(value.id, value.userId, value.completed)
}

export const countTodoTotalsService = async (request: IRequestPayload) => {
  const params: { userId: number } = {
    userId: request.payload?.userId,
  }

  return await countTotals(params.userId)
}
