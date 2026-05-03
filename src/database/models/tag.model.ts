import { Model, DataTypes, Sequelize, Optional, ForeignKey } from 'sequelize'
import { ITag } from '@/types'
import { UserModel } from './user.model'

export type TagCreationAttributes = Optional<ITag, 'id'>

export class TagModel extends Model<ITag, TagCreationAttributes> implements ITag {
  declare id: number
  declare name: string
  declare userId: ForeignKey<UserModel['id']>
}

export default function (sequelize: Sequelize): typeof TagModel {
  TagModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'tags',
      sequelize,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: false,
    },
  )

  return TagModel
}
