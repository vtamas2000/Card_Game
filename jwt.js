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
}