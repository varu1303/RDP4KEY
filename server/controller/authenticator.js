const jwt = require('jsonwebtoken');
const SECRETKEY = require('./../configuration/jwtsecret');


module.exports = token => {
    
    try {
        let decoded = jwt.verify(token, SECRETKEY);
        return decoded;
    } catch(err) {
//        console.log('err ', err);
        return false;
    }

};