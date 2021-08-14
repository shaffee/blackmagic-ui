const express = require('express');
var mongo = require( '../utils/mongodb' );
const router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var jwt = require('jsonwebtoken');


router.get('/getComponents', (req, res) => {
console.log(req.session);

  mongo.getDb().collection( 'components' ).find({}).toArray(function(err, result){

    for (x in result) {
      result[x].selected = false;
    }
      
    res.send(result);
  });

});

router.post('/save', (req, res) => {
console.log(req.body.id);


  var token = req.headers['x-access-token'];

  jwt.verify(token, 'shhhhh' , function(err, decoded) {

      if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });

      if( req.body.id.length > 12 )
      {
        var query = {_id:ObjectId(req.body.id) , userId:decoded.id};
      }
      else
      {
        var query = {_id:ObjectId("000000000000") , userId:decoded.id};
      }

      
      mongo.getDb().collection( 'circuits' ).find(query).toArray(function(err, result){
        if( result.length == 0 ){
            var circuit = {
              json : req.body.json,
              svg:req.body.svg,
              png:req.body.png,
              title:req.body.title,
              userId:decoded.id,
            };
            
            console.log(circuit);
            let id = 0;
            mongo.getDb().collection("circuits").insert(circuit , function(err,docsInserted){
              res.send({status:'success',code : 100 , msg:'Circuit created successfully',data:{id:docsInserted.insertedIds[0]}});

          });
        }
        else
        {
          console.log(query);
          var updateQuery = { $set: {json: req.body.json , svg:req.body.svg , png:req.body.png , title:req.body.title } };

          mongo.getDb().collection("circuits").updateOne(query,updateQuery);
          res.send({status:'success', code: 101 , msg:'circuit updated successfully',data:{}});
        }
      });
  });


});


router.post('/get', (req, res) => {
  var query = {_id:ObjectId(req.body.id)};

  mongo.getDb().collection( 'circuits' ).find(query).toArray(function(err, result){
    if( result.length == 0 ){
        res.send({status:'error', code: 101 , msg:'circuit not found',data:{}});
    }
    else{
      
      res.send({status:'success', code: 101 , msg:'circuit details',data:result[0]});
    }
  });
});

router.get('/userCircuits', (req, res) => {

  var token = req.headers['x-access-token'];

  jwt.verify(token, 'shhhhh' , function(err, decoded) {

    if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });

    mongo.getDb().collection( 'circuits' ).find({userId:decoded.id}).toArray(function(err, result){
      res.send({status:'success', code: 100 , msg:'circuits list',data:result});
    });
    /*
    mongo.getDb().collection( 'users' ).find({_id:ObjectId(decoded.id)}).toArray(function(err, result){
      if( result.length == 1 )
      {
          res.send({status:'sussess', code: 100 , msg:'',data:token});
  
      }
      else
      {
        res.send({status:'sussess', code: 120 , msg:'user_not_exists',data:{}});
      }
    });
    */
  });
});

  
module.exports = router;