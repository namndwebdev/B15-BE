const mongoose = require('../configs/mongo')

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    description: String,
    price: {
        type: Number,
        default: 0
    },
    salePrice: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 1
    }
}, {
    collection: 'products'
})

let ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel