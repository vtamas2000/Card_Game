var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.get('/', verify, function(req, res){
    res.render('../public/eratosthenes.html');
    console.log("Get request to the sieve of eratosthenes");
});

module.exports = router;