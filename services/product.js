const ProductModel = require('../models/Product')

const addProduct = (productObj)=>{
    let {name, description = '', price, salePrice, stock} = productObj
    //validate

    return ProductModel.create({
        name,
        description,
        price,
        price,
        salePrice,
        stock
    })
}
const getProduct = (query)=>{
    let {page = 1, pageSize = 10, sort="-creatAt,price"} = query
    let skip = ( page - 1 ) * pageSize
    sort = sort.replace(',',' ')
    return ProductModel.find({}).skip(skip).limit(pageSize).sort(sort)
}

module.exports = {
    addProduct,
    getProduct
}