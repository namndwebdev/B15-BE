const acl = require('express-acl');
acl.config({
    baseUrl: 'api',
    filename: 'nacl.json',
    path: 'configs',
    defaultRole: 'guest',
    decodedObjectName: 'user',
    roleSearchPath: 'user.role'
});


module.exports = acl