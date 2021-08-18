const Atem = require('./');
const atem = new Atem();


var command = process.argv.slice(2) == 0 ? 'disable' : 'enable';




atem.ip = "192.168.1.20";
atem.connect();

var called = 0;

atem.on('onAir', function(enabled, info) {
	
	if( called ) return 0;
	
	console.log("ennnnn");
	console.log(enabled);
	console.log(" "+command+"\n\r");
	
	if( !enabled && command == "enable"  )
	{
		called = 1;
		atem.onAir();
	}
	else if( enabled && command == "disable" )
	{
		called = 1;
		atem.onAir();
	}
});

//atem.onAir();



setTimeout( function(){ process.exit(0); } , 5000 );