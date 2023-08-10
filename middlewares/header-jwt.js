const {verifyJWT} = require('../helpers/jwt')

const validateJWT = async(req, res, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'token does not exist'
        })
    }
    if(verifyJWT(token)){
        next()
    }
    else{
        return res.status(401).json({
            msg: 'invalid token'
        })
    }
}

module.exports = {
    validateJWT
}