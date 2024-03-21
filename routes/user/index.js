const express = require('express')
const router = express.Router()
const userService = require('../../services/user')

router.get('/', async (req, res, next)=>{
    try {
        let data = await userService.getAllUser()
        res.json(data)
    } catch (error) {
        console.log(error);
        res.json('khong the lay user')
    }
})

router.get('/them', async (req, res, next)=>{
    try {
        let ketqua = await userService.createUser()
        res.json('them ok')
    } catch (error) {
        console.log(error);
        res.json('loi roi')
    }
})

module.exports = router