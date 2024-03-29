const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {validateEmail} = require('../../helper/validateData')
const {createUser, findUserByEmail} = require('../../services/user')
const bcrypt = require('bcrypt')
const { genJWT, verigyJWT } = require('../../helper/jwt')

router.post('/signup', async (req, res, next)=>{
    try {
        let result = await createUser(req.body)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next)=>{
    try {
        const {email, password} = req.body
        if(!validateEmail(email)){
            let errEmail = createError(400)
            errEmail.message = 'Dinh dang email sai'
            return next(errEmail)
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
                let errPassword = createError(400)
                errPassword.message = 'Mat khau sai'
                return next(errPassword)
            }
        }else{
            let errEmail = createError(400)
            errEmail.message = 'Email khong ton tai'
            return next(errEmail)
        }

        // let result = await 
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

router.use((error, req, res, next)=>{
    let routerName = 'Auth'
    if(error.status === 400){
        return res.status(400).json(`${routerName} API: ${error.message}`)
    }
    return res.status(500).json(`${routerName} API : Co van de xay ra voi server ${error.message}`)
})

module.exports = router