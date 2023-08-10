const { DataTypes } = require('sequelize');
const db = require('../database/connection.js');

const Author = db.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  nationality:{
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
});

console.log(Author === db.models.Author);

module.exports = Author;