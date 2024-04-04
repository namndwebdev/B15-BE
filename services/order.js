const OrderModel = require('../models/Order')
const {updateStockOfListProduct} = require('./product')
const {validateObjectId, removeEmptyKey} = require('../helper/validateData')
var createError = require('http-errors');

const createOrder = async (newOrder)=>{
    let {listProducts, customer, voucher} = newOrder
    await updateStockOfListProduct(listProducts)
        
    return OrderModel.create({
        listProducts, customer, voucher
    })
}

module.exports = {
    createOrder
}