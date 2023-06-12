var express = require('express')

var app = express()

const appname = 'DEMO';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const bodyParser = require('body-parser')
var hbs = require('hbs')
 

const handlebars = require('express-handlebars');
 
const routesPosting = require('./routes/posting')
 
  
app.set('view engine', 'hbs');
  
const {engine} = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));
 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/assets',express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   
var dateFormat = require("dateformat");
var now = new Date(); 

var day=dateFormat(req.session.join, "mmmm dd, yyyy")

console.log("Join Date : "+day);

  res.render('main', {
      layout: 'index',
      page1: true,  
      now: new Date()});
      
});
 
 
app.use('/', routesPosting);

module.exports = app;

app.listen(port, hostname, () => {   
  console.log(`Server running at http://${hostname}:${port}/`);
});

