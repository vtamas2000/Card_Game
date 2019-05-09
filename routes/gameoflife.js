var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.post('/', verify, function(req, res){
    var resolution_ = req.body.gameOfLifeRes;
    res.render('../public/gameoflife.html',
    {
        resolution: resolution_
    });
    console.log("Get request to gameoflife");
});

module.exports = router;