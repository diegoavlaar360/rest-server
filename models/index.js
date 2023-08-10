const Author = require('./author.js');
const Book = require('./book.js');
const Genre = require('./genre.js');
const BookGenre = require('./bookgenre.js');
const User = require('./user.js');

//Associations
//One to many
Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });

//Many to many
Book.belongsToMany(Genre, {through: BookGenre});
Genre.belongsToMany(Book, {through: BookGenre});

module.exports = {
    Author,
    Book,
    Genre,
    User
}