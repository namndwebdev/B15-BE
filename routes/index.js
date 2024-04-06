const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const productRouter = require('./product')
const orderRouter = require('./order')
const authRouter = require('./auth')

const orderRouterAdmin = require('./admin/order')

const {checkAuth} = require('@middlewares/authen')
const acl = require('@configs/nacl')


router.use('/auth', authRouter)

router.use(checkAuth)
router.use(acl.authorize)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/admin/orders', orderRouterAdmin)

module.exports = router