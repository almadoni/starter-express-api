const express = require('express');

const router = express.Router();
 

router.post('/posting', (reg, res) =>{
  const db = require("../db_config");
	
  let sql = `INSERT INTO favorite_songs (title, artist) 
            VALUES ('First Love 1', 'Utada Hikaru 1')`;
            
  db.run(sql, (err) => {
	  if (err) throw err;
	  console.log("1 record inserted");
	   res.status(200).json({code: "200", result: "Success"});  
  });          

  console.log('start user auth ....')
   

});


router.get('/list', (reg, res) =>{
  const db = require("../db_config");
	
  const sql = "SELECT * FROM favorite_songs";

db.all(sql, (err, rows) => {
  if (err) throw err;

  if (rows.length > 1) {
    // cetak isi rows
    rows.forEach((song) => {
      console.log(`[${song.id}] ${song.artist} - ${song.title}`);
    });
    res.status(200).json({code: "200", result: rows});  
  } else {
    console.log("tidak ada data/hasil");
  }
});

db.close();
            

}); 
 
  
module.exports = router;

