const mongoose = require('@configs/mongo')

let orderSchema = new mongoose.Schema({
    listProducts: [{
        idProduct: {
            type: String,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }],
    voucher: {
        type: Number,
        defualt: 0,
        min: 0,
        max: 1
    },
    customer: {
        idCustomer: {
            type: String,
            ref: 'User'
        },
        name: String,
        phone: {
            type: String,
            require: true
        },
        address: {
            type: String,
            require: true
        }
    },
    status: {
        type: String,
        enum: ['new', 'prepare', 'doing', 'done', 'cancel'],
        default: 'new' 
    }
}, {
    timestamps: true,
    collection: 'orders'
})

let OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel