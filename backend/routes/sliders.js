const express = require('express');
var mongo = require( '../utils/mongodb' );
var ObjectId = require('mongodb').ObjectId;
const router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.send('sliders!');
});
var sess;

router.post('/addtextslider', (req, res) => {
  console.log(req.sessionID);
  console.log(req.session);
  req.session.test = 'dsada';
  req.session.save();
  console.log(req.session);

  var slider = {
    text : req.body.text,
    seconds : req.body.seconds,
    textsize : req.body.textsize,
    type:'text',
  };
  
  mongo.getDb().collection("sliders").insert(slider, function(err,docsInserted){
    var data = {
      id:docsInserted.insertedIds[0],
    };
    
    //var token = jwt.sign( data , 'shhhhh');

    res.send({status:'success', code: 200 , msg:'تم إضافة الشريط بنجاح'});
  });

});

router.get('/gettextsliders', (req, res) => {

    mongo.getDb().collection( 'sliders' ).find({type:'text'}).toArray(function(err, result){
      result.reverse();
      res.send({status:'success', code: 100 , msg:'sliders list',data:result});
    });
});

router.get('/delete/:ID', (req, res) => {
  var ID = req.params.ID;

  var query = {_id:ObjectId(ID)};

  mongo.getDb().collection("sliders").deleteOne(query, function(err, obj) {
    if (err) throw err;
    res.send({status:'success', code: 100 , msg:'slider '+ID+' removed'});

  });

});

router.get('/present/:ID', (req, res) => {
  var ID = req.params.ID;

  var query = {_id:ObjectId(ID)};

  mongo.getDb().collection( 'sliders' ).find(query).toArray(function(err, result){

    if( result.length == 1 )
    {
        var slider = {
          animation : 'slideInRight',
          content : result[0].text,
          type : result[0].type
        }

        req.app.io.emit('show-slider', slider );

        res.send({status:'success',code : 100 , msg:'slider exists',data:result[0]});
    }
    else
    {
      res.send({status:'error', code: 300 , msg:'user_exists',data:{}});
    }
  });
});

router.get('/test/:ANIMATION',  function(req, res) {
  req.app.io.emit('update-msg', {animation:req.params.ANIMATION});

  res.send({status:'success', code: 100 , msg:'slider triggered'});
});

router.post('/changepassword', (req, res) => {
  
  
  if( !!req.session && !!req.session.user && !!req.session.user.userid )
  {
      var query = {_id:ObjectId(req.session.user.userid),password:req.body.currentpassword};

      mongo.getDb().collection( 'users' ).find(query).toArray(function(err, result){

        if( result.length == 1 )
        {
            var updateQuery = { $set: {password: req.body.password} };
            
    
            mongo.getDb().collection("users").updateOne(query,updateQuery);
    
            res.send({status:'success',code : 100 , msg:'password_changed',data:{}});
    
        }
        else
        {
          res.send({status:'error', code: 300 , msg:'user_exists',data:{}});
        }
      });
  }
  else
  {
    res.send({status:'error', code: 300 , msg:'user_exists',data:{}});
  }
  
});

router.post('/login', (req, res) => {
  
  mongo.getDb().collection( 'users' ).find({email:req.body.email,password:req.body.password}).toArray(function(err, result){

    if( result.length == 0 )
    {
        res.send({status:'error',code : 100 , msg:'wrong credentials',data:{}});
    }
    else
    {
      //var hashedPassword = bcrypt.hashSync(req.body.password, 8);

      var data = {
        id:result[0]._id,
        username:result[0].name,
      };
      
      var token = jwt.sign( data , 'shhhhh');

      res.send({status:'success', code: 200 , msg:'login success',data:token});
    }
  });
});

router.get('/logout', (req, res) => {
  console.log("logout",req.session);
  req.session.user = null;
  req.session.save();
  res.send({status:'success', code: 200 , msg:'login success',data:{}});
});

router.get('/checklogin', (req, res) => {

  var token = req.headers['x-access-token'];
console.log("tokeeeen",token);
  if (!token) return res.send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'shhhhh' , function(err, decoded) {

    if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });

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
  });

});


router.get('/getProfile', (req, res) => {

  var token = req.headers['x-access-token'];
console.log("tokeeeen",token);
  if (!token) return res.send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'shhhhh' , function(err, decoded) {

    if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });

    mongo.getDb().collection( 'users' ).find({_id:ObjectId(decoded.id)}).toArray(function(err, result){
      if( result.length == 1 )
      {
        console.log(result);
          let profile = {
            email: result[0].email || '',
            name: result[0].name || '',
            university : (result[0].university || ''),
            mobile : result[0].mobile || '',
            about : result[0].about || '',
          }

          res.send({status:'sussess', code: 100 , msg:'',data:profile});
  
      }
      else
      {
        res.send({status:'sussess', code: 120 , msg:'user_not_exists',data:{}});
      }
    });
  });

});

router.post('/updateProfile', (req, res) => {

  var token = req.headers['x-access-token'];
console.log("tokeeeen",token);
  if (!token) return res.send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'shhhhh' , function(err, decoded) {

    if (err) return res.send({ auth: false, message: 'Failed to authenticate token.' });
    var query = {_id:ObjectId(decoded.id)};

    mongo.getDb().collection( 'users' ).find(query).toArray(function(err, result){
      if( result.length == 1 )
      {
        console.log(result);
        var updateQuery = { $set: {
          name: req.body.name,
          about: req.body.about,
          university: req.body.university,
          mobile: req.body.mobile,
        }};
            
        mongo.getDb().collection("users").updateOne(query,updateQuery);

        res.send({status:'success',code : 100 , msg:'profile_updated'});
  
      }
      else
      {
        res.send({status:'sussess', code: 120 , msg:'user_not_exists',data:{}});
      }
    });
  });

});


module.exports = router;