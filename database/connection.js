const { Sequelize } = require('sequelize');

const db = new Sequelize('database_test', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;