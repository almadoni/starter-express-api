const fs = require('fs');
const fs2 = require('@cyclic.sh/s3fs')('cyclic-lazy-plum-lemur-robe-ap-northeast-2')
 
var formidable = require('formidable'); 

const express = require('express');
const router = express.Router();

const dbFile = __dirname + "/demo.db";  

router.get('/upload_database', (req, res) =>{

	res.render('main',{
		layout: 'index',
		username: req.session.username,
		upload_db: true 
	  });
});

router.post('/do_upload', (req, res) => {

	// membuat objek form dari formidable
      var form = new formidable.IncomingForm();

      // manangani upload file
      form.parse(req, async function (err, fields, file) {
      	console.log(file);
        var oldpath = file.filetoupload.filepath;
        // var newpath = __dirname + "/uploads/" + file.filetoupload.originalFilename;
        var newpath = file.filetoupload.originalFilename;

        console.log("oldpath : "+oldpath);
        console.log("newpath : "+newpath);

        if(fs2.existsSync(oldpath)){
        	console.log("file ada");
        	 
	        //Copy the uploaded file to a custom folder
		    fs2.rename(oldpath, newpath, function () {
		       
		      fs2.readdir("/", function (err, files) {
					    //handling error
					    if (err) {
					        return console.log('Unable to scan directory: ' + err);
					    } 
					    //listing all files using forEach
					    files.forEach(function (file) {
					        // Do whatever you want to do with the file
					        console.log(file); 
					    });
					}); 

		      res.render('main',{
                layout: 'index',
                username: req.session.username,
                upload_db: true,
                is_admin: true 
          });
		    });
        }else{
        	console.log("file not found");
        } 
        
      });


      


});

router.get('/give_access', (req, res) =>{
	console.log("Granting read and write access to user");
	try{
		var msg = "";

		// fs2.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
		//   if (err) throw err;
		//   console.log('File is created successfully.');

		// });

		// if(fs2.existsSync('newfile.txt')){
		// 	console.log("file baru ada");
		// }

		try {
		  // fs.copyFile(dbFile, '/tmp/demo.db');
		  // console.log(dbFile+' to demo.db');
		} catch {
		  console.error('The file could not be copied');
		}

		fs.readdir("/", function (err, files) {
					    //handling error
					    if (err) {
					        return console.log('Unable to scan directory: ' + err);
					    } 
					    //listing all files using forEach
					    files.forEach(function (file) {
					        // Do whatever you want to do with the file
					        console.log(file); 
					    });
					}); 

		if(fs2.existsSync('demo.db')){
			console.log("demo.db sudah ada");
		}

		
		console.log("path : "+dbFile);
		if (fs.existsSync(dbFile)) {
		  msg = "file exists";	
		  console.log('file exists');
		} else {
		  console.log('file not found!');
		  msg = "file not found!"
		}

		fs.chmod(dbFile, 0o600, () => {	 
			console.log("Reading the file contents"); 
		});
		res.status(200).json({code: "9200", result: "OK", message: msg}) 
	}catch(e){
		res.status(200).json({code: "9200", result: e.code, message: msg}) 
	}

});

module.exports = router;



