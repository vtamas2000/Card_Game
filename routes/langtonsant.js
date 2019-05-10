var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

router.post('/', verify, function(req, res){
    var input_ = req.body.langtonsAntRule;
    res.render('../public/langtonsant.html',
    {
        inputOfTheUser: input_
    });
    console.log("Post request to langtonsant");
});

module.exports = router;