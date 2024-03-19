var express = require('express')
var router = express.Router()
var userRouter = require('./user')
var productRouter = require('./product')
var orderRouter = require('./order')
var authen = require('../middlewares/authen')

router.use('/users', authen.checkAuth, userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

module.exports = router