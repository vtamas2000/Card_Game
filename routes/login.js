var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var db = require('../db.js');
var jwt = require('../jwt.js');

var token = jwt.sign({val: "se"});

router.get('/', function(req, res){
	res.render('../public/login.html');
	var veryfiedToken = jwt.verify(token);
	console.log(token + " successfully signed");
	console.log(jwt.decode(token) + " token decoded");
	console.log(veryfiedToken.val + " token veryfied");
	console.log(veryfiedToken + " check if expired");
	
});

router.post('/', function(req, res){
	
});

module.exports = router;