const { Sequelize } = require('sequelize');
const config = require(__dirname + '/config.json');

const sequelize = new Sequelize(config.development);

module.exports = sequelize;