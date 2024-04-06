const ProductModel = require('@models/Product')
const {validateObjectId, removeEmptyKey} = require('@helper/validateData')
var createError = require('http-errors');
const { INVALID_ID_PRODUCT } = require('@errors/product')
const getProduct = (query)=>{
    let {page = 1, pageSize = 10, sort="-createdAt,price"} = query
    let skip = (page - 1) * pageSize
    sort = sort.replace(',', ' ')
    
    return ProductModel.find({}).skip(skip).limit(pageSize).sort(sort)
}

const getProductById = (id) => {
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400, INVALID_ID_PRODUCT)
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
        throw createError(400, INVALID_ID_PRODUCT)
    }
    let {name, salePrice, price, stock} = newData
    let validData = removeEmptyKey({
        name,
        salePrice,
        price,
        stock
    })
    return ProductModel.findOneAndUpdate({_id: id}, validData, {
        new: true,
        runValidators: true
    })
}

const updateStockOfListProduct = async (listProducts)=>{
    let listId = listProducts.map(item=>{
        return item.id
    })
    let data = await ProductModel.find({_id: {$in: listId}})
    let listQuery = data.map((item)=>{
        let quantity = listProducts.find(e=> e.id == item.id)?.quantity
        quantity = quantity < 1 ? 1 : quantity

        item.stock -= quantity
        if(item.stock < 0){
            throw item._id + " het hang"
        }
        return {
                updateOne: {
                    filter: { _id: item.id },
                    update: { stock: item.stock } ,
                }
            }
    })

    return ProductModel.bulkWrite(listQuery)
}

const deleteProductById = (id)=>{
    let checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400, INVALID_ID_PRODUCT)
    }
    
    return ProductModel.findOneAndDelete({_id: id})
}

module.exports = {
    getProduct,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
    updateStockOfListProduct
}