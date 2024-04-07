const express = require('express')
const router = express.Router()
const createError = require('http-errors')

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
} = require('@services/order')

const { createErrorMiddleware } = require('@middlewares/error')
router.get('/', async (req, res, next)=>{
    try {
        let result = await getOrders(req.query)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.get('/:id', async (req, res, next)=>{
    try {
        let result = await getOrderById(req.params.id)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.post('/', async (req, res, next)=>{
    try {
        let result = await createOrder(req.body)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})


router.put('/:id', async (req, res, next)=>{
    try {
        let result = await updateOrderById(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.delete('/:id', async (req, res, next)=>{
    try {
        let result = await deleteOrderById(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})

let handleError = createErrorMiddleware('Orders')
router.use(handleError)

module.exports = router