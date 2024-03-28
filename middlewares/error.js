const createErrorMiddleware = (routerName)=>{
    // logic , ghi loi vao file
    
    return (error, req, res, next)=>{
        return res.status(error.status).json(`${routerName} API : ${error.message}`)
    }
}

module.exports = {
    createErrorMiddleware
}
