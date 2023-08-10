const {request, response} = require('express');
const {Author} = require('../models');

const getAuthors= async(req = request, res = response)=>{
    const authors = await Author.findAll();
    return res.json({
        author: authors,
        message: 'Get authors works!'
    })
}

const createAuthor=async(req = request, res = response)=>{
    try {
        const {name, nationality} = req.body;
        const newAuthor = await Author.create({name:name, nationality:nationality});
        res.json({
            author: newAuthor,
            message: 'Create author works!'
        })
    } catch (error) {
        console.error(error)
    }
}

const deleteAuthor=async(req = request, res = response)=>{
    const {id} = req.params;
    const authorSelected = await Author.findByPk(id);
    if(authorSelected !== null){
        await authorSelected.destroy();
        return res.json({
            author: authorSelected,
            message: 'Delete author works!'
        })
    }else{
        return res.json({
            message: 'Author not found'
        })
    }
}

const updateAuthor=async(req = request, res = response)=>{
    const {id} = req.params;
    const authorSelected = await Author.findByPk(id);
    if(authorSelected !== null){
        const {name, nationality} = req.body;
        await authorSelected.update({name:name, nationality:nationality});
        return res.json({
            author: authorSelected,
            message: 'Update author works!'
        })
    }else{
        return res.json({
            message: 'Author not found'
        })
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor
}