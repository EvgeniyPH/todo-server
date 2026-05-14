'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos_tags', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      todoId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'todos',
          },
          key: 'id',
        },
        allowNull: false,
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'tags',
          },
          key: 'id',
        },
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos_tags')
  },
}
