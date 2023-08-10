const express = require('express');
const router = express.Router();

const {getBooks, createBook, deleteBook, updateBook}=require('../controller/book');

router.get('/', getBooks);

router.post('/create', createBook);

router.delete('/delete/:id', deleteBook);

router.patch('/update/:id', updateBook);

module.exports = router;