const con = require("./connection_mysql");

const express = require('express');

const router = express.Router();
   
router.post('/login/auth', (reg, res) =>{
  console.log('start user auth ....')
  const {username, password} = reg.body;

  const sql = "select * from accounts where (username='"+username+"' or email='"+username+"') and password='"+password+"' and status = 'Admin'";
  // const sql = "select * from accounts where (username='$1' or email='$1') and password='$2' and status = 'Admin'";
  
  console.log("username : "+username);
  console.log("password : "+password);
 
    con.query(sql, (err, results) => {

    if(err) {
        res.render('login', {
              layout: 'login',
              message: err
            });
        throw err
    }
    
    console.log(results);

    console.log("length is : "+results.length);

    currId = 0
    if(results.length > 0){
      currId = results[0].id
    }
    var utcDateString = new Date(new Date().toUTCString()).toISOString();
    console.log("Date utc : "+utcDateString)
    console.log("id is :"+currId)
    date = new Date()
    console.log("current date : "+date)
    con.query('update accounts set last_login=$2 where id=$1;'
      ,[currId, date],(error, result) =>{
      console.log("success upload last login")
    });

    if(results.length > 0){
      reg.session.loggedin = true;
      reg.session.username = results[0].email;
      reg.session.fullname = results[0].fullname;
      reg.session.userid = results[0].id
      reg.session.status = results[0].status
      res.redirect('../')  
    }else{
      res.render('login', {
        layout: 'login',
        message: 'User salah password salah' 
      });    
    }
    
  }); 

});

router.get('/login', (reg, res) =>{
  console.log("date : "+ new Date())

  var ip = reg.headers['x-forwarded-for'] || 
     reg.connection.remoteAddress || 
     reg.socket.remoteAddress ||
     reg.connection.socket.remoteAddress;

  console.log("client ip : "+ip)
   
  console.log('view login...');
  reg.session.loggedin = false; 
  res.render('login', {
    layout: 'login' 
  });
});
  

router.get('/logout', (reg, res) =>{
  console.log('view logout...');
  reg.session.destroy(); 
  res.render('login', {
    layout: 'login' 
  }); 
});
  
module.exports = router;