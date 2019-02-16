var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

var nsp = io.of('/play');

nsp.on('connection', newConnection);

router.post('/', verify, function(req, res, next){
	res.render('../public/index.html');
	console.log("Post request to play");
});


function newConnection(socket){
   
    console.log('A user connected ' + socket.id);
    socket.on('mouse', mousemsg);
   
    function mousemsg(data){
        console.log("Data: " + JSON.stringify(data));
        socket.broadcast.emit('mouse', data);
    }
}



module.exports = router;