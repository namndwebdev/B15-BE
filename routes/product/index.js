const express = require('express')
const router = express.Router()
const {addProduct,getProduct} = require('../../services/product')
const { request } = require('../../app')
// localhost:4000/api/products

router.get('/', (req, res, next)=>{
    res.json('GET many Product')
})
router.get('/product', async (req, res, next)=>{
    try {
        let result = await getProduct(req.query)
        console.log(result)
        return res.send(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json('Khong the them SP')
    }
})
router.post('/', async (req, res, next)=>{
    try {
        let result = await addProduct(req.body)
        return res.json('ADD 1 Product Thanh cong')
    } catch (error) {
        console.log(error);
        return res.status(500).json('Khong the them SP')
    }
})
router.put('/:id', (req, res, next)=>{
    res.json('UPDATE 1 Product')
})
router.delete('/:id', (req, res, next)=>{
    res.json('Delete 1 Product')
})

module.exports = router