var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var db = require('../middlewares/db.js');
var bcrypt = require('bcrypt');

var registerSuccessful;

router.get('/', function(req, res){
	res.render('../public/register.html', {
		registerSuccess: registerSuccessful,
	});
});

router.post('/', function(req, res){
	var registerEmail = req.body.registerEmail;
	var registerPassword = req.body.registerPassword;
	var registerUsername = req.body.registerUsername;

	var checkIfUserExistsQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
	db.query(checkIfUserExistsQuery, [registerUsername, registerEmail], function(err, result){
		if (err) throw err;
		if (result.length > 0){
			console.log(result);
			registerSuccessful = false;
		} else {
			registerSuccessful = true;
		};

		if (registerSuccessful){
			console.log("Successfully registered " + registerUsername);
			const saltRounds = 10;
			bcrypt.hash(registerPassword, saltRounds, function(err, hash){
				const sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)" ;
		
				db.query(sql, [registerUsername, hash, registerEmail], function (err, result) {
					if (err) throw err;
					console.log("1 record inserted");
				});
			});
			res.render('../public/registerSuccess.html');
			registerSuccessful = undefined;
		} else {
			res.render('../public/register.html', {
				registerSuccess: registerSuccessful,
			});
			console.log(registerUsername + " tried to register, username was already in use");
			registerSuccessful = undefined;
		};
	});
});

module.exports = router;