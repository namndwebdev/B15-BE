const {verifyJWT} = require('../helper/jwt')
const createError = require('http-errors')
const {findToken} = require('../services/token')
const checkAuth = async (req, res, next)=>{
    try{
        let token = req.headers.authorization?.split(' ')[1]
        let isTokenInBlack = await findToken(token)
        
        if(isTokenInBlack){
            return next(createError(401, 'Token dang nam trong blacklist'))
        }

        if(!token){
            return next(createError(401, 'Ban chua dang nhap'))
        }

        let result = await verifyJWT(token)
        req.user = result
        
        next()
    }catch(err){
        switch (err.message) {
            case 'invalid signature':
            case 'invalid token':
            case 'jwt expired':
                return next(createError(403, err.message))
            default:
                return next(createError(500))
        }
    }
}

module.exports = {
    checkAuth
}