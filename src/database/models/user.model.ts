import { Model, DataTypes, Sequelize, Optional, CreationOptional } from 'sequelize'
import { IUser } from '@/types'

export type UserCreationAttributes = Optional<IUser, 'id'>

export class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
  declare id: number
  declare email: string
  declare username: string
  declare password: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
        unique: true,
      },
      username: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true,
    },
  )

  return UserModel
}
