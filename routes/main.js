var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var jwt = require('jsonwebtoken');

var verify = require('../middlewares/verify.js');
var db = require('../middlewares/db.js');

const millisecs = 60000;
//const expireTime = new Date(secs * 1000);

router.get('/', function(req, res){
	res.render('../public/mainmenu.html');
});

router.post('/play', verify, function(req, res, next){
	res.render('../public/index.html');
	console.log("Post request to play");
});

router.get('/logout', verify, function(req, res, next){
	var token = req.cookies.token_cookie;
	var decoded = jwt.decode(token, {complete: true});
	var dateOfIssue = new Date(decoded.payload.date);
	var dateWhenExpiresInMillisecs = dateOfIssue.getTime() + millisecs;
	var dateWhenExpires = new Date()
	console.log("Expire date: " + val1 + " " );
	var blacklistQuery = 'INSERT INTO blacklist (expireDate, token) VALUES (?, ?)';
	res.redirect('/login');
});

module.exports = router;