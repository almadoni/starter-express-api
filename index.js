//const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const login = require('./router/login');
const users = require('./router/users');
// const materi_ui = require('./router/materi_ui');
// const materi_assign_ui = require('./router/materi_assign_ui');

// const discussion_ui = require('./router/discussion_ui');
// const commentar_ui = require('./router/commentar_ui');
// const exam_ui = require('./router/exam_ui');
// const db = require('./router/queries');
// const data_materi = require('./router/materi');
// const discussion = require('./router/discussion');
// const commentar = require('./router/commentar');
// const exam = require('./router/exam');
// const report = require('./router/report_ui');
// const init_data = require('./router/init_master_data');

// const usage = require('./router/usage_history');
// const usage_ui = require('./router/usage_ui');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

const hbs = require('hbs')
const session = require('express-session');

const {engine} = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    layoutsDir: __dirname + '/views',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}));

app.use(session({
  secret: 'secret', //plaese change session id
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

/*
app.get('/', (req, res) =>{
	res.json({info: 'API E-Learning'});
})
*/

app.use('/assets',express.static(__dirname + '/public'));


app.get('/', (req, res) => {
// Using the index.hbs file instead of planB

  if (req.session.loggedin) {
    console.log("star /....")
    res.render('main', {
    layout: 'index',
    page1: true,
    // dateFormat: dateFormat,
    username: req.session.username,
    fullname: req.session.fullname,
    now: new Date()});

  } else {
    res.redirect('login');
  }
});

//app.use('/', init_data);
// app.use('/', usage_ui);
// app.use('/', report);
app.use('/', login);
app.use('/', users);
// app.use('/', materi_ui);
// app.use('/', materi_assign_ui);
// app.use('/', discussion_ui);
// app.use('/', commentar_ui);
// app.use('/', exam_ui);

// app.post('/api/usageHistory', usage.saveUsage);

// app.get('/api/users', db.getUsers)
// app.post('/api/login', db.login)
// app.post('/api/adduser', db.createUser)
// app.post('/api/register', db.register)
// app.put('/api/updateuser/:fcmid/:id', db.updateUser)

// //for materi
// app.get('/api/materies/:id', data_materi.getMateries)

// app.post('/api/discussion', discussion.setDiscussion);
// app.get('/api/discussions', discussion.getDiscussions);
// app.get('/api/discussionsWithComment', discussion.getDiscussionsWithComment);
// app.get('/api/commentars', commentar.getCommentars);
// app.get('/api/comments/:discussion_id', commentar.getComments);
// app.post('/api/addComment', commentar.addComment);

// app.post('/api/poinExam', exam.savePoinExam);
// app.get('/api/exams', exam.getExams);
// app.get('/api/exam/:materiId', exam.getExam);
// app.get('/api/score/:trxExam/:userId/:examId', exam.getScore);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
