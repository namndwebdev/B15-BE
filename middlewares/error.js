const { createLogger } = require('@helper/logger')

const createErrorMiddleware = (routerName)=>{
    // logic , ghi loi vao file
    const logger = createLogger(routerName)
    
    return (error, req, res, next)=>{
        let {originalUrl, ip} = req
        let agent = req.get('User-Agent')
        let params = JSON.stringify(req.params)
        let body = JSON.stringify(req.body)
        let query = JSON.stringify(req.query)
        let cookies = JSON.stringify(req.cookies)
        let token = req.headers['authorization'];
        
        let message = `
            ${ip}:${agent}:${originalUrl}
            code:${error.status} err: ${error.message}
            params: ${params}
            body: ${body}
            query: ${query}
            cookies: ${cookies}
            token: ${token}
                        `

        logger.error(message)
        return res.status(error.status).json(`${routerName} API : ${error.message}`)
    }
}

module.exports = {
    createErrorMiddleware
}
