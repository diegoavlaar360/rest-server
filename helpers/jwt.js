const jwt = require('jsonwebtoken');
const { User } = require('../models');
const key = 'abcdefgh';

const generateJWT = (data) =>{
    const token = jwt.sign(data, key, {expiresIn: '2000'});
    console.log(token);
    return token
}

const verifyJWT = async (token) =>{
    const decoded = jwt.verify(token, key);
    const userFound = await User.findByPk(decoded.id);

    if(userFound){
        return userFound
    }else{
        return null
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}