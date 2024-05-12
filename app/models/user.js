const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  person_id: {
    type: DataTypes.INTEGER, // Assumindo que personId é do tipo INTEGER
    allowNull: false, // Defina como true ou false dependendo se personId é obrigatório ou não
    references: {
      model: 'Person', // Nome do modelo ao qual personId está referenciando
      key: 'id' // Campo da tabela Person que personId está referenciando
    }
  }
}, {
  tableName: 'Users' // Defina o nome da tabela como 'Users'
});

module.exports = User;
