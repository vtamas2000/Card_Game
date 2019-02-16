//var jwt = require('./jwt.js');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var publicKey = fs.readFileSync('./otherFiles/public.key', 'utf8');
var db =  require('./db.js');

function verifyuser(req, res, next)
{   
    var blacklistQuery = "SELECT * FROM blacklist WHERE token = ?";
    var tokenIsInBlacklist;
    db.query(blacklistQuery, [req.cookies.token_cookie], function(err, result){
        if (err) throw err;
        if (result.length > 0){
            tokenIsInBlacklist = true;
        } else {
            tokenIsInBlacklist = false;
        };

        if (!tokenIsInBlacklist){
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
                res.redirect('/login');
        
            }
        } else {
            res.redirect('/login');
        };
    });
    
}

module.exports = verifyuser;