const Atem = require('./');
const atem = new Atem();



atem.on('sourceConfiguration', function(id, config, info) {
	console.log(id, info, config.videoInterface);
});


atem.ip = "192.168.1.20";
atem.connect();

atem.setKey(1);
atem.setChromaProperties(1);
atem.setKeyFill(1);



setTimeout( function(){ process.exit(0); } , 5000 );