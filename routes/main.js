var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res){
	res.render('../public/index.html');
	
});

module.exports = router;