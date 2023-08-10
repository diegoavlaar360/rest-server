const { DataTypes } = require('sequelize');
const db = require('../database/connection.js');

const BookGenre = db.define('BookGenre', {

}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

console.log(BookGenre === db.models.BookGenre);

module.exports = BookGenre;