const OrderModel = require('../models/Order')
const {updateStockOfListProduct} = require('./product')
const {validateObjectId, removeEmptyKey} = require('../helper/validateData')
var createError = require('http-errors');

const getOrders = (query)=>{
    let {page = 1, pageSize = 10, sort="-createdAt,price"} = query
    let skip = (page - 1) * pageSize
    sort = sort.replace(',', ' ')
    
    return OrderModel.find({}).skip(skip).limit(pageSize).sort(sort)
}

const createOrder = async (newOrder)=>{
    let {listProducts, customer, voucher} = newOrder
    await updateStockOfListProduct(listProducts)
        
    return OrderModel.create({
        listProducts, customer, voucher
    })
}

const getOrderById = (id) => {
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400)  // {  statsus: ,  messsage:   }
    }
    return OrderModel.findOne({
        _id: id
    })
}

const updateOrderById = (id, newData)=>{
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400)  // {  statsus: ,  messsage:   }
    }
    let {name, phone, address, status} = newData
    let validData = removeEmptyKey({
        customer: {
            name,
            phone,
            address,
        },
        status
    })
    return OrderModel.findOneAndUpdate({_id: id}, validData, {
        new: true,
        runValidators: true
    })
}


module.exports = {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderById
}