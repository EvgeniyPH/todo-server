import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface IUser {
  id?: number
  email: string
  username: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserResponse extends Omit<IUser, 'password' | 'createdAt' | 'updatedAt'> {}

export interface ITodo {
  id?: number
  title: string
  completed: boolean
  description?: string
  priority: 'High' | 'Medium' | 'Low'
  dueDate: Date
  userId: number
  tags?: ITag[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ITodoResponse extends Omit<ITodo, 'createdAt' | 'updatedAt'> {}

export interface ITag {
  id?: number
  name: string
  userId?: number
}

export interface ITodoTag {
  id?: number
  todoId: number
  tagId: number
}

export interface IRequestPayload extends Request {
  payload?: JwtPayload
}

export interface TodoFilterParams {
  title?: string
  completed?: boolean
  userId: number
}
