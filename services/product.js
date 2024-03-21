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

module.exports = {
    addProduct
}