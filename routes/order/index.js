const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {
    deleteProductById
} = require('@services/product')

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    cancelOrderById
} = require('@services/order')

const { createErrorMiddleware } = require('@middlewares/error')
const { ONLY_CANCEL_WITH_NEW } = require('@errors/order')
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
        let result = null;
        if(req.body.status){
            // muon cap nhat status
            if(req.body.status != 'cancel'){
                throw createError(400, ONLY_CANCEL_WITH_NEW)
            }else{
                // nguoi dung muon cancel
                result = await cancelOrderById(req.params.id, req.body)
            }
        }else{
            // muon cap nhat thong tin
            result = await updateOrderById(req.params.id, req.body)
        }
        
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.delete('/:id', async (req, res, next)=>{
    try {
        let result = await deleteProductById(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})

let handleError = createErrorMiddleware('Orders')
router.use(handleError)

module.exports = router