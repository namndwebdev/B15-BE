const bcrypt = require('bcrypt')
const UserModel = require('@models/User')
const { validateObjectId, removeEmptyKey } = require('@helper/validateData')
const {INVALID_ID_USER} = require('@errors/user')
const createError = require("http-errors");

const getUserByQuery = async (query = {}, page = 1, limit = 10)=>{
    let findPromise = UserModel.find(query).select('-password -__v').skip((page - 1) * limit).limit(limit).exec()
    let countPromise = UserModel.countDocuments(query)
    let data = await findPromise
    let total = await countPromise
    return {
        data, total, page
    }
}

const getAllUser = async (page=1, limit=10)=>{
    return getUserByQuery({}, page, limit)
}

const getDetailUser = (id) => {
    const checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400, INVALID_ID_USER)
    }
    return UserModel.findOne({ _id: id }).select('-password -__v')
}

const findUserByEmail = async (email)=>{
    return UserModel.findOne({
        email: email
    })
}

const createUser = async (permission, newUser)=>{
    let {name, email, password, role} = newUser

    let saltRounds = 10
    let hashedPassword = await bcrypt.hash(password, saltRounds)
    
    return UserModel.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: permission === "admin" ? role : "user"
    })
}

const updateUser = async (id, permission, data) => {
    const checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400, INVALID_ID_USER)
    }

    let {name, email, password, role} = data

    let hashedPassword = null
    if(password) {
        let saltRounds = 10
        hashedPassword = await bcrypt.hash(password, saltRounds)
    }
    role = permission === "admin" ? role : null

    let validData = removeEmptyKey({
        name,
        email,
        password: hashedPassword,
        role
    })
    return UserModel.findOneAndUpdate({_id: id}, validData, {
        new: true,
        projection: { password: 0 , __v: 0},
        runValidators: true
    })
}

const deleteUser = (id) => {
    const checkId = validateObjectId(id)
    if(!checkId){
        throw createError(400, INVALID_ID_USER)
    }
    return UserModel.findOneAndDelete({_id: id}).select('-password -__v')
}

module.exports = {
    getAllUser,
    createUser,
    findUserByEmail,
    getDetailUser,
    updateUser,
    deleteUser
}