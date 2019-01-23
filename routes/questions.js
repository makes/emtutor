var express = require('express');
var Question = require("../models/question.js");

var router = express.Router();

router.get('/', function(req, res) {
    // get all questions in the database using mongoose
    Question.find(function(err, questions) {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err)
        }
        res.json(questions); // return all questions as JSON
    });
});

module.exports = router;