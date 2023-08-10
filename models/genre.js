const { DataTypes } = require('sequelize');
const db = require('../database/connection.js');

const Genre = db.define('Genre', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
}, {
});

console.log(Genre === db.models.Genre);

module.exports = Genre;