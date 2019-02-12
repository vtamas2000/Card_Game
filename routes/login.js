var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var db = require('../db.js');
var jwt = require('../jwt.js');

router.get('/', function(req, res){
	res.render('../public/login.html');
	console.log(jwt.sign({val: "se"}) + " successfully signed");
});

router.post('/', function(req, res){
	
});

module.exports = router;