var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var db = require('../db.js');

var bcrypt = require('bcrypt');

router.get('/', function(req, res){
	res.render('../public/register.html');
});

router.post('/', function(req, res){
	var registerEmail = req.body.registerEmail;
	var registerPassword = req.body.registerPassword;
	var registerUsername = req.body.registerUsername;
	console.log("New registration, email: " + registerEmail + " password: " + registerPassword + " username: " + registerUsername);

	/*Write the database query here
	The registered email is stored in registerEmail
	The registered password is stored in regsterPassword
	The registered username is stored in registerUsername */
	

	//this is hashing and adding new user to database with hashed password:
	const saltRounds = 10;
	bcrypt.hash(registerPassword, saltRounds, function(err, hash){
		const sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)" ;

		db.query(sql, [registerUsername, hash, registerEmail], function (err, result) {
			if (err) throw err;
			console.log("1 record inserted");
		});
	});	

	res.render('../public/registerSuccess.html');
});

module.exports = router;