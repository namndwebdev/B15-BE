const bcrypt = require('bcrypt')
const UserModel = require('../models/User')

const getAllUser = ()=>{
    return UserModel.find({})
}

const createUser = async (newUser)=>{
    let {name, email, password} = newUser
    let saltRounds = 10
    let hashedPassword = await bcrypt.hash(password, saltRounds)
    
    return UserModel.create({
        name: name,
        email: email,
        password: hashedPassword
    })
}

module.exports = {
    getAllUser,
    createUser
}