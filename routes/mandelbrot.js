var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.get('/', verify, function(req, res){
    res.render('../public/mandelbrot.html');
    console.log("Get request to mandelbrot");
});

module.exports = router;