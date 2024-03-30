const mongoose = require('../configs/mongo')

const tokenSchema = new mongoose.Schema({
    value: String
}, {
    collection: 'token',
    timestamps: true
})

const TokenModel = mongoose.model('Token', tokenSchema)
tokenSchema.index({createdAt: 1},{expireAfterSeconds: 300});

module.exports = TokenModel