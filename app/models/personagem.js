const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Personagem = sequelize.define('Personagem', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_jogador: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Personagem;
