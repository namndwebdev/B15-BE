const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {
    getProduct, 
    getProductById, 
    addProduct, 
    updateProductById, 
    deleteProductById
} = require('../../services/product')
const { createErrorMiddleware } = require('../../middlewares/error')
router.get('/', async (req, res, next)=>{
    try {
        let result = await getProduct(req.query)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.get('/:id', async (req, res, next)=>{
    try {
        let result = await getProductById(req.params.id)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.post('/', async (req, res, next)=>{
    try {
        let result = await addProduct(req.body)
        return res.json(result)
    } catch (error) {
        next(createError(500, error))
    }
})
router.put('/:id', async (req, res, next)=>{
    try {
        let result = await updateProductById(req.params.id, req.body)
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

let handleError = createErrorMiddleware('Product')
router.use(handleError)

module.exports = router