const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const productRouter = require('./product')
const orderRouter = require('./order')
const authRouter = require('./auth')
const authen = require('../middlewares/authen')

router.use('/auth', authRouter)
router.use('/users', authen.checkAuth, userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)

module.exports = router