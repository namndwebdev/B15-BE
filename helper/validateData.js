const mongoose = require('mongoose')
const validateObjectId = (id)=>{
    return mongoose.Types.ObjectId.isValid(id)
}

const validateEmail = (email)=>{
    let emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/img
    return emailRegex.test(email)
}

const removeEmptyKey = (obj)=>{
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if(value === null || value === undefined || value === NaN){
                delete obj[key]
            }
        }
    }
    return obj
}

const isEmptyObject = (obj)=>{
    return Object.keys(obj).length == 0
}

const validateQueryPaging = ({page, limit}) => {
    page = Number(page);
    page = isNaN(page) || page < 1 ? 1 : page;
    limit = Number(limit);
    limit = isNaN(limit) || limit < 1 ? 1 : limit;
    return {
        page,
        limit,
    };
}

module.exports = {
    validateObjectId,
    removeEmptyKey,
    validateEmail,
    isEmptyObject,
    validateQueryPaging
}