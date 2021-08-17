const config = require('./config');
const app = require('./app');
var https = require('https')
const express = require('express');
var spawn = require('child_process').spawn;

console.log(config.httpPort);
const server = app.listen(config.httpPort, () => {
  console.log(`http is running on port ${config.httpPort}`);
});



app.io = require('socket.io')(server,{
  cors: {
    origin: "*",
    credentials: true
  }
});

var commands = ``;

app.io.on('connection', (socket) => {

  socket.on('rebuild', (socket) => {
      ls    = spawn('sh',['build.sh']);

      ls.stdout.on('data', function (data) {
        app.io.emit("update-process", {msg:data.toString(),type:'msg'});
      });

      ls.stderr.on('data', function (data) {
        app.io.emit("update-process", {msg:data.toString(),type:'error'});
      });

      ls.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
      });
    });
});



