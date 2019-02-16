var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');
var db = require('../middlewares/db.js');
var jwt = require('../middlewares/jwt.js');

/*io.on('connection', function(socket){
	console.log("valami");
});*/

router.get('/', function(req, res){
	res.render('../public/login.html');
	console.log("Cookies :  ", req.cookies.token_cookie);
});

router.post('/', function(req, res){
	var loginUsername = req.body.loginUsername;
	var loginPassword = req.body.loginPassword;
	var loginSuccess;

	var loginQuery = "SELECT * FROM users WHERE username = ?";
	db.query(loginQuery, [loginUsername], function(err, result){
		if (err) throw err;
		if (result.length == 1){
			loginSuccess = true;
		} else {
			loginSuccess = false;
		};

		if (loginSuccess){
			bcrypt.compare(loginPassword, result[0].password, function(err, success){
				if(success){
					var dateOfSign = new Date();
					var deleteblacklisted = "DELETE FROM blacklist WHERE expireDate < ?";
					db.query(deleteblacklisted, [dateOfSign], function(err, result){
						if(err) throw err;
						console.log("Deleted from blacklist: " + result.affectedRows  + " record");
					});					
					var token = jwt.sign({user: loginUsername, date: dateOfSign});
					res.cookie("token_cookie" , token);
					//res.render('../public/mainmenu.html');
					res.redirect("/");
					console.log("Successfully logged in " + loginUsername + " " + token);
				} else {
					console.log("Failed to log in " + loginUsername);
					res.render('../public/mainmenu.html');
				};
			});
		} else {
			res.render('../public/mainmenu.html');
			console.log("Username does not exist " + loginUsername);
		};	
	});
		
});

module.exports = router;