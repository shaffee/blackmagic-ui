const express = require('express');
var fs = require('fs');
var mongo = require( '../utils/mongodb' );
var ObjectId = require('mongodb').ObjectId;
const router = express.Router();

const multer  = require('multer')
const upload = multer({ dest: './uploads/' })


router.post('/upload', upload.single("file") ,  function(req, res) {
    const { filename: image } = req.file;
    res.send({file:req.file.filename});
});

router.get("/background/:IMAGE",(req,res) => {
    
    if( req.params.IMAGE != 'undefined' )
    {
        fs.readFile('./uploads/' + req.params.IMAGE , function(err, data) {
            if (err) throw err; // Fail if the file can't be read.
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data); // Send the file data to the browser.
            });
    }    
});

router.get('/getSettings', (req, res) => {
  
    mongo.getDb().collection( 'settings' ).find({}).toArray(function(err, result){

        if( result.length > 0 )
        {
            result.reverse();
            res.send(result[0]);
        }
        else
        {
            res.send({});
        }
    });
});


router.post('/saveSettings', (req, res) => {
  
    mongo.getDb().collection( 'settings' ).find({}).toArray(function(err, result){

        if( result.length > 0 )
        {
            result.reverse();
            var query = {_id:ObjectId(result[0]._id)};

            delete req.body._id;

            var updateQuery = { $set: req.body };
            console.log(updateQuery);
            mongo.getDb().collection("settings").updateOne(query,updateQuery, function(err,docsInserted){
                res.send({status:'success',code : 100 , msg:'settings updated',data:{}});
            });
        }
        else
        {
            mongo.getDb().collection("settings").insert(req.body, function(err,docsInserted){
                res.send({status:'success',code : 100 , msg:'settings inserted',data:{}});
            });
        }
    });
});

module.exports = router;