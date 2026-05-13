import { validateRegister, validateLogin } from './validator'
import { findUserByEmail, createUser } from './repository'
import { compareSync, hash } from 'bcrypt'
import { generateJWT } from '@/utils/jwtUtils'
import config from '@/config'
import { IUser, IUserResponse } from '@/types'
import ApiErrors from '@/error/ApiErrors'

interface LoginResponse {
  user: IUserResponse
  accessToken: string
}

export const loginService = async (userData: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  const { error } = validateLogin(userData)
  if (error) {
    throw new ApiErrors(error.message, 400)
  }
  const user = await findUserByEmail(userData.email)

  if (!user) {
    throw new ApiErrors('Email or password is invalid', 401)
  }

  const validPassword = compareSync(userData.password, user.password)
  if (!validPassword) {
    throw new ApiErrors('Email or password is invalid', 401)
  }

  const payload = {
    userId: user.id,
    name: user.username,
  }

  const accessToken = await generateJWT(payload, config.jwtSecretKey)

  return { user: { id: user.id, email: user.email, username: user.username }, accessToken }
}

export const registerService = async (userData: IUser): Promise<IUserResponse> => {
  const { error } = validateRegister(userData)
  if (error) {
    throw new ApiErrors(error.message, 400)
  }

  const findUser = await findUserByEmail(userData.email)
  if (findUser) {
    throw new ApiErrors(`Email ${userData.email} already exists`, 409)
  }

  const hashedPassword = await hash(userData.password, 10)
  const newUserData = await createUser({
    ...userData,
    password: hashedPassword,
  })

  return { id: newUserData.id, email: userData.email, username: userData.username }
}
