const mysql = require('mysql'); 

const client = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12626600",
  password: "qQBbdEkHsh",
  database: "sql12626600"
});

client.connect(function(err){
    if(!!err){
        console.log(err)
    }
    else{
        console.log('Connected')
    }
});

module.exports = client;