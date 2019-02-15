var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

var verify = require('../middlewares/verify.js');

router.get('/', function(req, res){
	res.render('../public/mainmenu.html');
});

router.post('/play', verify, function(req, res, next){
	res.render('../public/index.html');
	console.log("Post request to play");
});

module.exports = router;