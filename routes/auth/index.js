const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {validateEmail} = require('@helper/validateData')
const {createUser, findUserByEmail} = require('@services/user')
const bcrypt = require('bcrypt')
const { genJWT, verigyJWT } = require('@helper/jwt')
const { createErrorMiddleware } = require('@middlewares/error')
const { saveToken } = require('@services/token')
const {
    INVALID_EMAIL,
    WRONG_PASSWORD,
    EMAIL_NOT_EXIST
} = require('@errors/auth')
router.post('/signup', async (req, res, next)=>{
    try {
        let result = await createUser(req.body)
        return res.json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
})

router.post('/login', async (req, res, next)=>{
    try {
        const {email, password} = req.body
        if(!validateEmail(email)){
            return next(createError(400, INVALID_EMAIL))
        }

        let user = await findUserByEmail(email)
        if(user){
            let checkPassword = bcrypt.compareSync(password, user.password)
            if(checkPassword){
                user = user.toJSON()
                delete user.password
                let token = await genJWT(user)
                return res.json({
                    user: user,
                    token: token
                })
            }else{
                return next(createError(400, WRONG_PASSWORD))
            }
        }else{
            return next(createError(400, EMAIL_NOT_EXIST))
        }

        // let result = await 
        return res.json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
})

router.get('/logout', async (req, res, next)=>{
    try {
        let token = req.headers.authorization?.split(' ')[1]
        await saveToken(token)

        return res.json('Dang xuat thanh cong')
    } catch (error) {
        next(createError(500, error.message))
    }
})

let handleError = createErrorMiddleware('Auth')
router.use(handleError)

module.exports = router