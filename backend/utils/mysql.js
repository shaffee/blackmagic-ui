
var mysql = require('mysql');

var _db;

module.exports = {

  connectToServer: function( callback ) {

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "blackmagic"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("mysql Connected!");
    });

    _db = con;
  },

  insert : function( table , row ){
    
  },

  getDb: function() {
    return _db;
  }
};