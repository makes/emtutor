var express = require('express');
var mongodb = require('mongodb');
var app = require('express')();

const questions = require('./routes/questions.js');
//  Connect all our routes to our application
app.use('/api/questions', questions);

const MongoClient = mongodb.MongoClient;
const db_uri = "mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true";
var db;

var mongoose = require('mongoose');

var port = process.env.PORT || 1337;

var res = "No connection"

app.use(express.static(__dirname + '/public'));     // static files location

app.get('/', function(request, response){
    response.send(res);
});

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

app.get('*', function(req, res) {
    res.sendFile('public/index.html', { root : __dirname });
});

db.once('open', function() {
    res = "we're connected!";

    app.listen(port);
});

console.log("Server running on port %d", port);
