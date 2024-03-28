const express = require('express')
const router = express.Router()
const { createErrorMiddleware } = require('../../middlewares/error')

router.get('/', (req, res, next)=>{
    res.json('GET Orders')
})

let handleError = createErrorMiddleware('Order')
router.use(handleError)

module.exports = router