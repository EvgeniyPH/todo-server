import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  ForeignKey,
  CreationOptional,
  HasManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  CreationAttributes,
} from 'sequelize'
import { ITodo, ITag } from '@/types'
import { UserModel } from './user.model'
import { TagModel } from './tag.model'

export type TodoCreationAttributes = Optional<ITodo, 'id' | 'description' | 'tags'>

export class TodoModel extends Model<ITodo, TodoCreationAttributes> implements ITodo {
  declare id: number
  declare title: string
  declare completed: boolean
  declare description: string | undefined
  declare priority: 'High' | 'Medium' | 'Low'
  declare dueDate: Date
  declare tags: ITag[] | undefined
  declare userId: ForeignKey<UserModel['id']>
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>

  declare addTags: BelongsToManyAddAssociationsMixin<ITag, ITag['id']>
  declare getTags: BelongsToManyGetAssociationsMixin<ITag>
}

export default function (sequelize: Sequelize): typeof TodoModel {
  TodoModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'todos',
      sequelize,
      timestamps: true,
    },
  )

  return TodoModel
}
