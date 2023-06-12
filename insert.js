const db = require("./db_config");

let sql = `INSERT INTO favorite_songs (title, artist) 
            VALUES ('First Love', 'Utada Hikaru')`;

db.run(sql, (err) => {
  if (err) throw err;
  console.log("1 record inserted");
});

db.close();
