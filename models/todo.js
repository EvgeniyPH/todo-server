const db = require('../db')
const { DataTypes } = require('sequelize')

const Todo = db.define('todo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  description: { type: DataTypes.TEXT },
  priority: { type: DataTypes.ENUM('High', 'Medium', 'Low'), allowNull: false },
  dueDate: { type: DataTypes.DATE, allowNull: false },
})

module.exports = Todo
