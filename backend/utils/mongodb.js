const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost";
//test:d2121kdSa2$@
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url, {useNewUrlParser: true, useUnifiedTopology: true}, function( err, client ) {
      console.log(err);
      _db  = client.db('blackmagic');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};