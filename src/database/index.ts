import Sequelize, { Dialect } from 'sequelize'
import config from '../config/config'
import TodoInit, { TodoModel } from './models/todo.model'
import UserInit, { UserModel } from './models/user.model'
import TagInit, { TagModel } from './models/tag.model'
import TodoTagInit, { TodoTagModel } from './models/todoTag.model'

import { IUser } from '@/types'

const { dbDialect, dbHost, dbName, dbPassword, dbPort, dbUser } = config

export const database = new Sequelize.Sequelize(dbName, dbUser, dbPassword, {
  dialect: (dbDialect as Dialect) || 'postgres',
  host: dbHost,
  port: dbPort,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: false,
    freezeTableName: true,
  },
})

// database.authenticate() // Test the database connection

interface IModels {
  Users: typeof UserModel
  Todos: typeof TodoModel
  Tags: typeof TagModel
  TodoTag: typeof TodoTagModel
}

const models = (): IModels => {
  const Users = UserInit(database)
  const Todos = TodoInit(database)
  const Tags = TagInit(database)
  const TodoTag = TodoTagInit(database)

  // Define associations between models if needed
  Users.hasMany(Todos, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'todo',
  })

  Users.hasMany(Tags, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'tag',
  })

  // Define many-to-many relationship between Todo and Tag through a join table 'todo_tags'
  Todos.belongsToMany(Tags, { through: TodoTag, as: 'tags', foreignKey: 'todoId', otherKey: 'tagId' })
  Tags.belongsToMany(Todos, { through: TodoTag, as: 'todos', foreignKey: 'tagId', otherKey: 'todoId' })

  return {
    Users: Users,
    Todos: Todos,
    Tags: Tags,
    TodoTag: TodoTag,
  }
}

export default models()
