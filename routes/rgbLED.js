var express = require('express');
var router = express.Router();
var verify = require('../middlewares/verify.js');

var Gpio = require('pigpio').Gpio,
ledRed = new Gpio(22, {mode: Gpio.OUTPUT}),
ledGreen = new Gpio(17, {mode: Gpio.OUTPUT}),
ledBlue = new Gpio(27, {mode: Gpio.OUTPUT}), 
redRGB = 0,
greenRGB = 0,
blueRGB = 0;

ledRed.digitalWrite(0);
ledGreen.digitalWrite(0);
ledBlue.digitalWrite(0);


var nsp = io.of('/rgbLED');

nsp.on('connection', newConnection);

router.get('/', verify, function(req, res, next){

	res.render('../public/rgb.html');
	console.log('get request to rgb');

});


function newConnection(socket){

	console.log('A user connected to rgb' + socket.id);
 	socket.on('rgbLed', function(data){
	console.log(data);
	
	redRGB = parseInt(data.red);
	greenRGB = parseInt(data.green);
	blueRGB = parseInt(data.blue);

	ledRed.pwmWrite(redRGB);
	ledGreen.pwmWrite(greenRGB);
	ledBlue.pwmWrite(blueRGB);
	socket.broadcast.emit('rgbLed', data);
	});
	
	

}

process.on('SIGINT', function(){
	ledRed.digitalWrite(0);
	ledGreen.digitalWrite(0);
	ledBlue.digitalWrite(0);
	process.exit();
});

module.exports = router;
