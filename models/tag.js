const db = require('../db')
const { DataTypes } = require('sequelize')

const Tag = db.define('tag', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: false },
})

module.exports = Tag
