const ProductModel = require('../models/Product')
const {validateObjectId, removeEmptyKey} = require('../helper/validateData')
var createError = require('http-errors');

const getProduct = (query)=>{
    let {page = 1, pageSize = 10, sort="-createdAt,price"} = query
    let skip = (page - 1) * pageSize
    sort = sort.replace(',', ' ')
    
    return ProductModel.find({}).skip(skip).limit(pageSize).sort(sort)
}

const getProductById = (id) => {
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400)  // {  statsus: ,  messsage:   }
    }
    return ProductModel.findOne({
        _id: id
    })
}

const addProduct = (productObj)=>{
    let {name, description = '', price, salePrice, stock} = productObj
    // tien xu li
    
    return ProductModel.create({
        name,
        description,
        price,
        price,
        salePrice,
        stock
    })
}

const updateProductById = (id, newData)=>{
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400)  // {  statsus: ,  messsage:   }
    }
    let {name, salePrice, price, stock} = newData
    let validData = removeEmptyKey({
        name,
        salePrice,
        price,
        stock
    })
    return ProductModel.findOneAndUpdate({_id: id}, validData, {
        new: true
    })
}

const deleteProductById = (id)=>{
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400)  // {  statsus: ,  messsage:   }
    }
    
    return ProductModel.findOneAndDelete({_id: id})
}

module.exports = {
    getProduct,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
}