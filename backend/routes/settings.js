const express = require('express');
var fs = require('fs');
var mysql = require( '../utils/mysql' );
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

router.get('/getSettings', async (req, res) => {
  
    await mysql.getDb().query('select * from settings ORDER BY id DESC LIMIT 1' , (err, results) => {
        if( results.length > 0 )
        {
            res.send(results[0]);
        }
        else
        {
            res.send({});
        }
    });
});


router.post('/saveSettings', async (req, res) => {
  
    delete req.body.id;
    var query = await mysql.getDb().query('INSERT INTO settings SET ?', req.body, function(err, result) {
        res.send({status:'success', code: 200 , msg:'تم إضافة الشريط بنجاح'});
    });
    
});


router.post('/rebuild', async (req, res) => {
  
    exec("ls -l");
});



module.exports = router;