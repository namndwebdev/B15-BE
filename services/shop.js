const ShopModel = require("@models/Shop")
const {validateObjectId, removeEmptyKey} = require('@helper/validateData')
var createError = require('http-errors')
const { INVALID_ID_SHOP } = require("@configs/errors/shop")

const findShopById = (idShop) => {
    return ShopModel.findOne({ _id: idShop })
}

const createShopForMe = (idUser, dataShop) => {
    const { name } = dataShop
    console.log(name)
    return ShopModel.create({
        idUser,
        name
    })
}

const updateShopForMe = async ({idShop, dataShop, idUser}) => {
    const checkId = validateObjectId(idShop)
    if(!checkId) {
        throw createError(400, INVALID_ID_SHOP)
    }

    const isMyShop = await findShopById(idShop)
    if(!isMyShop) {
        throw createError(400, "Shop khong ton tai")
    } else {
        if(isMyShop.idUser !== idUser) {
            throw createError(400, "Shop khong phai cua ban")
        }
    }
    
    const { name } = dataShop
    const validData = removeEmptyKey({
        name
    })
    return ShopModel.findOneAndUpdate(
        { _id: idShop },
        validData,
        { new: true, runValidators: true }
    )
}

module.exports = {
    createShopForMe,
    updateShopForMe,
    findShopById
}