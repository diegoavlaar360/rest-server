const express = require('express');
const router = express.Router();

const {getGenres, createGenre, deleteGenre, updateGenre}=require('../controller/genre');

router.get('/', getGenres);

router.post('/create', createGenre);

router.delete('/delete/:id', deleteGenre);

router.patch('/update/:id', updateGenre);

module.exports = router;