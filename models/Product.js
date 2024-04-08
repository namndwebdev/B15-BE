const mongoose = require('@configs/mongo')

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    description: String,
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    salePrice: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 1,
        min: 1
    }
}, {
    timestamps: true,
    collection: 'products'
})
let ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel