const express = require('express')
const app = express()

const AWS = require("aws-sdk");
const s3 = new AWS.S3()

//require('dotenv').config({path: __dirname + '/.env'})

 
app.all('/', (req, res) => {
  
    console.log("Just got a request!")
    res.send('Yo!.. ini baru di update aja yaaa...')
})
app.listen(process.env.PORT || 3000)
