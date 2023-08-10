const {request, response} = require('express');
const {User} = require('../models');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const {generateJWT} = require('../helpers/jwt');

const getUsers= async(req = request, res = response)=>{
    const users = await User.findAll();
    return res.json({
        user: users,
        message: 'Get users works!'
    })
}

const createUser=async(req = request, res = response)=>{
    try {
        const {username, password} = req.body;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({username:username, password:hash});
        res.json({
            user: newUser,
            message: 'Create user works!'
        })
    } catch (error) {
        console.error(error)
    }
}

const login=async(req = request, res = response)=>{
    try {
        const {username, password} = req.body;
        const userSelected = await User.findOne({where:{username:username}})
        console.log(userSelected.password)
        const passwordRecovered = bcrypt.compareSync(password, userSelected.password);
        console.log(passwordRecovered)

        const token = generateJWT({id:userSelected.id, username:userSelected.username })
        if (userSelected != null && passwordRecovered == true) {
            res.json({
                user: userSelected,
                message: 'Login successful',
                token:token
            })   
        } else {
            res.json({
                message: 'Error, please check the email or password'
            })   
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getUsers,
    createUser,
    login
}