const jwt = require('jsonwebtoken');

module.exports = {
    sign: (LoginID) => {
        var signOptions = {
            expiresIn: 86400
        }
        return jwt.sign({LoginID}, "T#eBe$tD@$#B0@[)ever" ,signOptions);
    },
    verify: (token) => {
        var verifyOptions = {
            expiresIn: 86400
        }
        try{
            return jwt.verify(token, "T#eBe$tD@$#B0@[)ever", verifyOptions);
        } catch (err) {
            return false;
        }
    },
}
