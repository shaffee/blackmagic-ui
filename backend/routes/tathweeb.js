const express = require('express');
var fs = require('fs');
var mysql = require( '../utils/mysql' );
var util = require('util');
const router = express.Router();

const multer  = require('multer')

const upload = multer({ dest: './uploads/' })
  


router.get('/delete/:ID', async (req, res) => {
    var ID = req.params.ID;

    const result = await mysql.getDb().query('DELETE FROM slider_text WHERE `id`='+ID , (err, results) => {
        res.send({status:'success', code: 100 , msg:'delete done' });
        console.log(results);
    });

});

router.post('/upload', upload.array('file[]') ,  async function(req, res) {
    console.log(req.files);

    for(var i=0; i < req.files.length; i++ )
    {
        var row = {
            filename : req.files[i].filename,
        }

        var query = await mysql.getDb().query('INSERT INTO tathweeb SET ?', row , function(err, result) {
        });
    }

    res.send({status:'success', code: 200 , msg:'تم إضافة الصور بنجاح'});

    //const { filename: image } = req.file;
    //res.send({file:req.file.filename});
});

router.get('/getImages', async (req, res) => {
  
    await mysql.getDb().query('select * from tathweeb ORDER BY id DESC' , (err, results) => {
        res.send({status:'success', code: 200 , msg:'تم إضافة الصور بنجاح' , data:results });

    });
});


router.get("/getImage/:IMAGE",(req,res) => {
    
    if( req.params.IMAGE != 'undefined' )
    {
        fs.readFile('./uploads/' + req.params.IMAGE , function(err, data) {
            if (err)
            {
                console.log("error no file ");
                console.log(err);
            }
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data); // Send the file data to the browser.
            });
    }    
});

router.get('/gettextsliders', async (req, res) => {

    const result = await mysql.getDb().query("select * from slider_text WHERE `type`='tathweebtext'" , (err, results) => {
      res.send({status:'success', code: 100 , msg:'data' , data : results});
    });
  
    
  });

router.post('/addText', async (req, res) => {
  
    var slider = {
      text : req.body.text,
      seconds : 0,
      textsize : 20,
      type:'tathweebtext',
    };

    var query = await mysql.getDb().query('INSERT INTO slider_text SET ?', slider, function(err, result) {
      res.send({status:'success', code: 200 , msg:'تم إضافة الشريط بنجاح'});
    });
  });

 
router.get('/present', async (req, res) => {
    var slider = {
        animation : 'slideInRight',
        type : 'tathweeb'
    }
  
    const query = util.promisify(mysql.getDb().query).bind(mysql.getDb());


    slider.images = await query('select * from tathweeb');
    slider.text = await query("select * from slider_text WHERE `type`='tathweebtext'");

    req.app.io.emit('show-tathweeb', slider );

    res.send({status:'success', code: 200 , msg:'presented',data:slider});
    

  });
  

module.exports = router;