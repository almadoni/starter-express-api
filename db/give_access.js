const fs = require('fs');
const fs2 = require('@cyclic.sh/s3fs')(S3_BUCKET_NAME)

const express = require('express');
const router = express.Router();

const dbFile = __dirname + "/demo.db";  

router.get('/give_access', (req, res) =>{
	console.log("Granting read and write access to user");
	try{
		var msg = "";

		fs2.writeFile('newfile.txt', 'Learn Node FS module', function (err) {
		  if (err) throw err;
		  console.log('File is created successfully.');
		});

		
		console.log("path : "+dbFile);
		if (fs.existsSync(dbFile)) {
		  msg =+ "file exists";	
		  console.log('file exists');
		} else {
		  console.log('file not found!');
		  msg =+ "file not found!"
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



