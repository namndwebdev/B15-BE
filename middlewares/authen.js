const checkAuth = (req, res, next)=>{
    console.log('di qua middleware checkAuth');

    next()
}

module.exports = {
    checkAuth
}