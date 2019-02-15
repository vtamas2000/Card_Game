//var jwt = require('../middlewares/jwt.js');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var publicKey = fs.readFileSync('./otherFiles/public.key', 'utf8');

function verifyuser(req, res, next)
{
    try
    {
        var decoded = jwt.verify(req.cookies.token_cookie, publicKey);
        req.userdata = decoded;
        console.log("req_token_cookie " + req.cookies.token_cookie);
        next();
    }
    catch(err)
    {
        /*return res.status(401).json({
            message: 'Auth failed',
            error: err
        });*/
        //console.log("not verified");
        res.render('../public/login.html');
        
    }
    
}

module.exports = verifyuser;