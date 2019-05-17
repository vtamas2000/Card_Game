var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

var nsp = io.of('/play');

nsp.on('connection', newConnection);

var room_input;
var fullrooms = [];

router.post('/', verify, function(req, res, next){
   room_input = req.body.RoomName;
    if (fullrooms.filter(i => i === room_input).length !== 2){
        console.log("Post request to play");   
        console.log("room_iput: " + room_input); 
        return  res.render('../public/index.html',
        {
            inputOfTheUser: room_input
        });   
    }else{
        //res.send('<script>alert("This room is full")</script>');
        //return res.render('../public/mainmenu.html');
        return res.redirect('/');
    }
});


function newConnection(socket){
      
    socket.join(room_input);
    var curr_room = room_input;
    console.log('A user connected ' + socket.id);

    console.log("room: " + room_input + " length: " + io.nsps['/play'].adapter.rooms[room_input].length);
    
    fullrooms.push(room_input);

    socket.on('mouse', mousemsg);

    function mousemsg(data){
        console.log("Data: " + JSON.stringify(data));
        //socket.broadcast.emit('mouse', data);
        socket.broadcast.to(room_input).emit('mouse', data);
    }

    socket.on('disconnect', function(){
        console.log("user: " + socket.id + " disconnected");
        let index = fullrooms.indexOf(curr_room);
        if (index !== -1) 
          fullrooms.splice(index, 1);
    });
}


module.exports = router;