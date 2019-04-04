var express = require('express');
var Quiz = require("../models/quiz.js");

var router = express.Router();

router.get('/', function(req, res) {
    // get all quizzes in the database using mongoose
    Quiz.find(function(err, quizzes) {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err)
        }
        res.json(quizzes); // return all quizzes as JSON
    });
});

module.exports = router;