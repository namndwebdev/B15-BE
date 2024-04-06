const OrderModel = require('../models/Order')
const {updateStockOfListProduct} = require('./product')
const {validateObjectId, removeEmptyKey, isEmptyObject} = require('../helper/validateData')
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

/**
 * Update 1 order đầu tiên khớp query để cập nhật trạng thái hoặc thông tin khách
 * @param {Object} query dieu kien de tim order
 * @param {Object} newData trạng thái hoặc thông tin khách {name, phone, address, status}
 * @returns null || {}
 */
const updateOrderWithQuery = (query, newData)=>{
    if(isEmptyObject(query)){
        throw "Query must not empty"
    }
    if(isEmptyObject(newData)){
        throw "NewData must not empty"
    }
    let {name, phone, address, status} = newData
    
    let customerInfo = removeEmptyKey({
        name,
        phone,
        address,
    })
    let validData = removeEmptyKey({
        status
    })

    if(!isEmptyObject(customerInfo)){
        if(customerInfo.name){
            validData['customer.name'] = customerInfo.name
        }
        if(customerInfo.address){
            validData['customer.address'] = customerInfo.address
        }
        if(customerInfo.phone){
            validData['customer.phone'] = customerInfo.phone
        }
    }

    return OrderModel.findOneAndUpdate(query, validData, {
        new: true,
        runValidators: true
    })
}

const updateOrderById = (id, newData)=>{
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400);
    }
    return updateOrderWithQuery({_id: id}, newData)
}


const cancelOrderById = (id)=>{
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400);
    }
    return updateOrderWithQuery({_id: id, status: 'new'}, {status: 'cancel'})
}


module.exports = {
    getOrders,
    createOrder,
    getOrderById,
    updateOrderById,
    updateOrderWithQuery,
    cancelOrderById
}