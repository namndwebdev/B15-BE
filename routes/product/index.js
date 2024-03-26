const express = require('express')
const router = express.Router()
const {
    getProduct, 
    getProductById, 
    addProduct, 
    updateProductById, 
    deleteProductById
} = require('../../services/product')

router.get('/', async (req, res, next)=>{
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

router.use((error, req, res, next)=>{
    let routerName = 'Product'
    if(error.status === 400){
        return res.status(400).json(`${routerName} API: ${error.message}`)
    }
    return res.status(500).json(`${routerName} API : Co van de xay ra voi server`)
})

module.exports = router