
var express = require('express');
const querystring = require('querystring');
var app = express();


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "matam"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//atem.onAir();


var http = require('http');

var server = http.createServer(app);
var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(3000);  //listen on port 80



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var http2 = require('http');
http2.createServer(function (req, res) {

	req.url = req.url.replace("/?","");
	var vars = querystring.parse(req.url);
	
	console.log(vars);
	if( vars.id > 0 )
	{
		console.log("SELECT * FROM `slider_text` WHERE id='"+vars.id+"'");
		
		
		con.query("SELECT * FROM `slider_text` WHERE id='"+vars.id+"'", function (err, result, fields) {
			if (err) throw err;
			
			result[0].action ="slider";
			
			io.sockets.emit('update-msg', { data: result[0]});

		 });
	}
	else if( vars.id < 0 )
	{
		io.sockets.emit('update-msg', { data: {action:'clear'} });	
	}
	
	res.writeHead(200, {
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
	});	
	
	res.write('Hello World!');
	res.end();
}).listen(8080);