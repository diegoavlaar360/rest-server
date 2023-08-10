const {request, response} = require('express');
const {Genre} = require('../models');

const getGenres= async(req = request, res = response)=>{
    const genres = await Genre.findAll();
    return res.json({
        genre: genres,
        message: 'Get genres works!'
    })
}

const createGenre=async(req = request, res = response)=>{
    try {
        const {name} = req.body;
        const newGenre = await Genre.create({name:name});
    
        return res.json({
            genre:newGenre,
            message: 'Create genre works!'
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const deleteGenre=async(req = request, res = response)=>{
    const {id} = req.params;
    const genreSelected = await Genre.findByPk(id);
    if(genreSelected !== null){
        await genreSelected.destroy();
        return res.json({
            genre: genreSelected,
            message: 'Delete genre works!'
        })
    }else{
        return res.json({
            message: 'Genre not found'
        })
    }
}

const updateGenre=async(req = request, res = response)=>{
    const {id} = req.params;
    const genreSelected = await Genre.findByPk(id);
    if(genreSelected !== null){
        const {name} = req.body;
        await genreSelected.update({name:name});
        return res.json({
            genre: genreSelected,
            message: 'Update genre works!'
        })
    }else{
        return res.json({
            message: 'Genre not found'
        })
    }
}

module.exports = {
    getGenres,
    createGenre,
    deleteGenre,
    updateGenre
}