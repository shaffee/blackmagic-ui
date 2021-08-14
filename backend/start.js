const config = require('./config');
const app = require('./app');
var https = require('https')
const express = require('express');

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


app.io.on('connection', (socket) => {
  console.log('a user connected');
});
