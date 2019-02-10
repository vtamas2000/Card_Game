var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var db = require('../db.js');

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
	//db.query()

	res.render('../public/registerSuccess.html');
});

module.exports = router;