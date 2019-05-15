var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.post('/', verify, function(req, res){
    var inputn = req.body.PiCircles;
    var inputm = req.body.PiIterations;
    res.render('../public/montecarlopi.html',
    {
        inputOfTheUsern: inputn,
        inputOfTheUserm: inputm
    });
    console.log("Post request to montecarlopi");
});

module.exports = router;