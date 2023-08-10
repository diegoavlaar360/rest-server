const { DataTypes } = require('sequelize');
const db = require('../database/connection.js');

const Book = db.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING
  },
  language:{
    type: DataTypes.STRING
  }
}, {
});

console.log(Book === db.models.Book);

module.exports = Book;