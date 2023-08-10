const express = require('express');
const router = express.Router();

const {getAuthors, createAuthor, deleteAuthor, updateAuthor}=require('../controller/author');

router.get('/',getAuthors);

router.post('/create', createAuthor);

router.delete('/delete/:id', deleteAuthor);

router.patch('/update/:id', updateAuthor);

module.exports = router;