const {verifyJWT} = require('@helper/jwt')
const createError = require('http-errors')
const {findToken} = require('@services/token')
const {
    TOKEN_BLACKIST,
    UNAUTHEN,
    ADMIN_PERMISSION,
    MANAGER_PERMISSION
} = require('@errors/auth')
const checkAuth = async (req, res, next)=>{
    try{
        let token = req.headers.authorization?.split(' ')[1]
        let isTokenInBlack = await findToken(token)
        
        if(isTokenInBlack){
            return next(createError(401, TOKEN_BLACKIST))
        }

        if(!token){
            return next(createError(401, UNAUTHEN))
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

const checkAdmin = async (req, res, next)=>{
    if(req.user.role === 'admin'){
        next()
    }else{
        next(createError(403, ADMIN_PERMISSION))
    }
}

const checkManager = async (req, res, next)=>{
    if(req.user.role === 'admin' || req.user.role === 'manager'){
        next()
    }else{
        next(createError(403, MANAGER_PERMISSION))
    }
}

module.exports = {
    checkAuth,
    checkManager,
    checkAdmin
}