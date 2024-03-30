const TokenModel = require('../models/Token')
const saveToken = (token)=>{
    return TokenModel.create({
        value: token
    })
}
const findToken = (token)=>{
    return TokenModel.findOne({
        value: token
    })
}
module.exports = {
    saveToken,
    findToken
}