'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      person_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'People', // Tabela de pessoas
          key: 'id' // Chave primária da tabela de pessoas
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' // Se uma pessoa for excluída, todos os usuários associados a ela também serão excluídos
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
