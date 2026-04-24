const Todo = require('./todo')
const Tag = require('./tag')
const User = require('./user')
const TodoTag = require('./todoTags')

// Define associations between models if needed
User.hasMany(Todo)
Todo.belongsTo(User)

User.hasMany(Tag)
Tag.belongsTo(User)

// Define many-to-many relationship between Todo and Tag through a join table 'todo_tags'
Todo.belongsToMany(Tag, { through: TodoTag })
Tag.belongsToMany(Todo, { through: TodoTag })

module.exports = {
  Todo,
  Tag,
  User,
  TodoTag,
}
