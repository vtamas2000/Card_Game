var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){
	res.render('../public/mainmenu.html');
});

router.get('/play', function(req, res){
	res.render('../public/index.html');
});

module.exports = router;