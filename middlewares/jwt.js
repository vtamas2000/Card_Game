var fs = require('fs');
var jwt = require('jsonwebtoken');

var privateKey = fs.readFileSync('./otherFiles/private.key', 'utf8');
var publicKey = fs.readFileSync('./otherFiles/public.key', 'utf8');

module.exports = {
    sign: function(payload){
        var signOptions = {
            /*issuer: options.issuer,
            subject: options.subject,
            audience: options.audience,*/
            expiresIn: "1d",
            algorithm: "RS256"
        };
        return jwt.sign(payload, privateKey, signOptions);
    },

    verify: function(token){
        var verifyOptions = {
            expiresIn:  "1d",
            algorithm:  ["RS256"]
        };
        try {
            return jwt.verify(token, publicKey, verifyOptions);
        } catch (err) {
            return false;
        }
    },

    decode: function(token){
        return jwt.decode(token, {complete: true});
    }
}