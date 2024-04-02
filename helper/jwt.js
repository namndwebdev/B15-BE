const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path')

let pubKey = fs.readFileSync(path.join(__dirname, '../keys/rsa-public-key.pem'))
let privateKey = fs.readFileSync(path.join(__dirname, '../keys/rsa-private-key.pem'))

const genJWT = (payload)=>{
    return new Promise((resolve, reject)=>{
        jwt.sign(payload, privateKey, { expiresIn: Number(process.env.JWT_EXPIRED), algorithm: 'RS256' }, function(err, token){
            if(err){
                reject(err)
            }else{
                resolve(token)
            }
        });
    })
}

const verifyJWT = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, pubKey, { algorithms: ['RS256'] }, function(err, data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

module.exports = {
    genJWT,
    verifyJWT
}

