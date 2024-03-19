var UserModel = require('../models/User')

var getAllUser = ()=>{
    return UserModel.find({})
}

var createUser = ()=>{
    return UserModel.create({
        name: 'nam',
        email: 'namndwebdev2@gmail.com',
        password: '123456'
    })
}

module.exports = {
    getAllUser,
    createUser
}