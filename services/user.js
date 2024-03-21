const UserModel = require('../models/User')

const getAllUser = ()=>{
    return UserModel.find({})
}

const createUser = ()=>{
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