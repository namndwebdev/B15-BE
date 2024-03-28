const express = require('express')
const router = express.Router()
const {
    getProduct, 
    getProductById, 
    addProduct, 
    updateProductById, 
    deleteProductById
} = require('../../services/product')
const {checkAuth} = require('../../middlewares/authen')
const { createErrorMiddleware } = require('../../middlewares/error')
router.get('/', checkAuth, async (req, res, next)=>{
    try {
        let result = await getProduct(req.query)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async (req, res, next)=>{
    try {
        let result = await getProductById(req.params.id)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})
router.post('/', async (req, res, next)=>{
    try {
        let result = await addProduct(req.body)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})
router.put('/:id', async (req, res, next)=>{
    try {
        let result = await updateProductById(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})
router.delete('/:id', async (req, res, next)=>{
    try {
        let result = await deleteProductById(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

let handleError = createErrorMiddleware('Product')
router.use(handleError)

module.exports = router