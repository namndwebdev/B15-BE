const express = require('express')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.json('GET Orders')
})

module.exports = router