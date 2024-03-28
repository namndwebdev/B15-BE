const {verifyJWT} = require('../helper/jwt')
const createError = require('http-errors')
const checkAuth = async (req, res, next)=>{
    try{
        let token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return next(createError(401, 'Ban chua dang nhap'))
        }

        let result = await verifyJWT(token)
        req.user = result
        
        next()
    }catch(err){
        console.log(err);
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