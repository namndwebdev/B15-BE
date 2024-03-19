var express = require('express')
var router = express.Router()

router.get('/', (req, res, next)=>{
    res.json('GET Orders')
})

module.exports = router