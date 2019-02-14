var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');
var db = require('../db.js');
var jwt = require('../jwt.js');

router.get('/', function(req, res){
	res.render('../public/login.html');
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
					var token = jwt.sign({user: loginUsername, date: dateOfSign});
					res.render('../public/mainmenu.html');
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