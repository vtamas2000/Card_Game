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
	console.log("New registration, email: " + registerEmail + " password: " + registerPassword);

	/*Write the database query here
	The registered email is stored iin registerEmail
	The registered password s stored n regsterPassword */
	//db.query()

	res.render('../public/registerSuccess.html');
});

module.exports = router;