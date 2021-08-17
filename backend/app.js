const express = require('express');
const sliders = require('./routes/sliders');
const settingsRoute = require('./routes/settings');

var mysql = require( './utils/mysql' );
const session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var serveStatic = require('serve-static');
const path = require('path');
var jwt = require('jsonwebtoken');
const config = require('./config');


const app = express();

app.use(cookieParser());
app.use(session({
    secret: "1234567890QWERTY",
    resave: false,
    saveUninitialized: false,
}));



app.use(cors({
    origin: [
      '*',
      'http://localhost:4200',
      'https://localhost:4200',
      'http://192.168.1.120',
      'http://localhost'
    ],
    credentials: true,
}));



//app.use(session({secret: 'ssshhhhh',resave: false, saveUninitialized: true, cookie: { secure: false }}));


mysql.connectToServer( function( err ) {
    if (err) console.log(err);

    console.log("mysql connected");
    // start the rest of your app here
  } );
  

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));







//nodejs API
app.use('/sliders', sliders);
app.use('/settings', settingsRoute);
//main static pages / vuejs build
var staticPath = express.static(config.path);
app.use('/', staticPath );
app.use('*', staticPath );

module.exports = app;