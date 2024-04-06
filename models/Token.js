const mongoose = require('@configs/mongo')

const tokenSchema = new mongoose.Schema({
    value: String
}, {
    collection: 'token',
    timestamps: true
})

const TokenModel = mongoose.model('Token', tokenSchema)
tokenSchema.index({createdAt: 1},{expireAfterSeconds: Number(process.env.JWT_EXPIRED)});

module.exports = TokenModel