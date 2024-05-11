const { DataTypes } = require('sequelize');
const sequelize = require(__dirname + '/../config/connection');

const Personagem = sequelize.define('Personagem', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_jogador: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Personagens'
});

module.exports = Personagem;
