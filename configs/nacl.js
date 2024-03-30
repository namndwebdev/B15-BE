const acl = require('express-acl');
acl.config({
    baseUrl: 'api',
    filename: 'nacl.json',
    path: 'configs',
    defaultRole: 'anonymous',
    decodedObjectName: 'user',
    roleSearchPath: 'user.role'
});

module.exports = acl