var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.get('/', verify, function(req, res){
    res.render('../public/linewars.html');
    console.log("Get request to linewars");
});

module.exports = router;