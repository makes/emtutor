'use strict'
//require('mithril/test-utils/browserMock')(global)
//global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest

var express = require('express')
var bodyParser = require('body-parser')
//var web = require('./server/web')
//var rest = require('./server/rest')
var compression = require('compression')
var browserify = require('browserify-middleware')
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var app = express()

const questions = require('./server/routes/questions.js');
const question = require('./server/routes/question.js');
const quizzes = require('./server/routes/quizzes.js');
const quiz = require('./server/routes/quiz.js');

var port = process.env.PORT || 1337;

const MongoClient = mongodb.MongoClient;
const db_uri = "mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true";
var db;

var res = "No connection"


//app.get('/', function(request, response){
//  response.send(res);
//});

mongoose.connect(db_uri, {dbName: 'emtutor', useNewUrlParser: true});
db = mongoose.connection;
db.on('error', function (err) {
    if (err) // couldn't connect
  
    res = "connection failed";
    // hack the driver to allow re-opening after initial network error
    //db.db.close();
  
    // retry if desired
    //connect();
});


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(compression())
//  Connect all our routes to our application
app.use('/api/questions', questions); // no real use for this
app.use('/api/question', question);
app.use('/api/quizzes', quizzes);
app.use('/api/quiz', quiz);
//app.use('/api/v1', rest)
//app.get('/index.js', res.sendFile(browserify('./client/index.js'), { root : __dirname }));
app.get('/index.js', browserify('client/index.js'));
app.use(express.static(__dirname + '/client/public')); // static files to be served

app.get('*', function(req, res) {
  res.sendFile('./client/public/index.html', { root : __dirname });
});


db.once('open', function() {
  res = "we're connected!";

  app.listen(port);
});

//var port = process.env.PORT || 8000
console.log('Server running on port ' + port)
