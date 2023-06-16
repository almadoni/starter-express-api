const mysql = require('mysql');

const con = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12626600",
  password: "qQBbdEkHsh",
  database: "sql12626600"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM accounts", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
