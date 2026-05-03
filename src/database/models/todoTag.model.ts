import { Model, DataTypes, Sequelize, Optional } from 'sequelize'
import { ITodoTag } from '@/types'

export type TodoTagCreationAttributes = Optional<ITodoTag, 'id'>

export class TodoTagModel extends Model<ITodoTag, TodoTagCreationAttributes> implements ITodoTag {
  declare id: number
  declare todoId: number
  declare tagId: number
}

export default function (sequelize: Sequelize): typeof TodoTagModel {
  TodoTagModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      todoId: {
        type: DataTypes.INTEGER,
      },
      tagId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'todos_tags',
      sequelize,
      timestamps: false,
    },
  )

  return TodoTagModel
}
