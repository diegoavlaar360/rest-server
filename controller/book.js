const {request, response} = require('express');
const {Book, Author, Genre} = require('../models');
const BookGenre = require('../models/bookgenre');

const getBooks= async(req = request, res = response)=>{
    const books = await Book.findAll();
    return res.json({
        book: books,
        message: 'Get books works!'
    })
}

const createBook=async(req = request, res = response)=>{
    try {
        const {title, language, authorId, genreId = null} = req.body;
        const authorSelected = await Author.findByPk(authorId);
        if(authorSelected == null){
            return res.status(400).json({
                message: `AuthorId ${authorId} not found`
            })
        }
        const newBook = await Book.create({title:title, language:language, authorId:authorId});

        if (genreId != null) {
            const genres = await Genre.findAll({where:{id: Array.isArray(genreId) ? genreId : [genreId]}});
            await newBook.addGenres(genres, {through: BookGenre});
        }

        return res.json({
            book:newBook,
            message: 'Create book works!'
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }    
}

const deleteBook=async(req = request, res = response)=>{
    const {id} = req.params;
    const bookSelected = await Book.findByPk(id);
    if(bookSelected !== null){
        await bookSelected.destroy();
        return res.json({
            book: bookSelected,
            message: 'Delete book works!'
        })
    }else{
        return res.json({
            message: 'Book not found'
        })
    }
}

const updateBook=async(req = request, res = response)=>{
    const {id} = req.params;
    const bookSelected = await Book.findByPk(id);
    if(bookSelected !== null){
        const {title, language, authorId, genreId} = req.body;
        const authorSelected = await Author.findByPk(authorId);
        if(authorSelected == null){
            return res.status(400).json({
                message: `AuthorId ${authorId} not found`
            })
        }
        await bookSelected.update({title:title, language:language, authorId:authorId});
        if (genreId != null) {
            const genres = await Genre.findAll({where:{id: Array.isArray(genreId) ? genreId : [genreId]}});
            await bookSelected.setGenres(genres, {through: BookGenre});
        }
        return res.json({
            book: bookSelected,
            message: 'Update book works!'
        })
    }else{
        return res.json({
            message: 'Book not found'
        })
    }
}

module.exports = {
    getBooks,
    createBook,
    deleteBook,
    updateBook
}