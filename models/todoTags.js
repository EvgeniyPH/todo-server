const db = require('../db')
const { DataTypes } = require('sequelize')

const TodoTag = db.define('todo_tags', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

module.exports = TodoTag
