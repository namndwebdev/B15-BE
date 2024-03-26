const express = require('express')
const router = express.Router()
const {createUser} = require('../../services/user')

router.post('/signup', async (req, res, next)=>{
    try {
        let result = await createUser(req.body)
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