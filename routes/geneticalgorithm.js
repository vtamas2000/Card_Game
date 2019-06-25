var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.get('/', verify, function(req, res){
    res.render('../public/genetic_algorithm.html');
    
    console.log("Get request to genetic_algorithm");
});

module.exports = router;