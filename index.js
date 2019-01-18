var express = require('express');
var mongodb = require('mongodb');
var app = express();

const MongoClient = mongodb.MongoClient;
const db_uri = "mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true";
var db;

var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var port = process.env.PORT || 1337;

var res = "No connection"

var questionSchema = new mongoose.Schema({
    id: String,
    title: String,
    choices: [{ title: String, feedback: String }]
})

var Question = mongoose.model('question', questionSchema);

var question = new Question({ id: 'pwave', title: 'Millainen P-aalto?', choices: [ {title: 'Positiivinen', feedback: 'Jees!'}, {title: 'Bifaasinen', feedback: 'V&auml;&auml;rin meni.'}, {title: 'Negatiivinen', feedback: 'V&auml;&auml;rin meni.'}, {title: 'Ei P-aaltoja', feedback: 'V&auml;&auml;rin meni.'}] });

app.get('/', function(request, response){
    response.send(res);
});

mongoose.connect(db_uri, {dbName: 'emtutor'});
db = mongoose.connection;
db.on('error', function (err) {
    if (err) // couldn't connect
  
    res = "connection failed";
    // hack the driver to allow re-opening after initial network error
    //db.db.close();
  
    // retry if desired
    //connect();
});

db.once('open', function() {
    res = "we're connected!";

    /*
    question.save(function (err, question) {
        if (err) res = "FAIL!";
    });
    */

    Question.find(function (err, questions) {
        if (err) res = err;
        else res = questions[0].title;
        //else res = JSON.stringify(questions);
        //else res = questions.toObject();
        app.listen(port);
    })

});

/*
MongoClient.connect(db_uri, { useNewUrlParser: true }, function(err, database) {
    if(!err) {
        res = "We are connected";
    } else {
        res = "noc";
    }
    db = database.db("emtutor");

    coll = db.collection("coll")
    coll.find({}).toArray(function (err, result) {
        if (err) {
            res = err;
        } else {
            res = JSON.stringify(result);
        }
    })
    app.listen(port);
    //db_client.close();
});
*/

console.log("Server running on port %d", port);
