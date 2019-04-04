var express = require('express');
var Quiz = require("../models/quiz.js");

var router = express.Router();

router.get('/:quiz_id/:question', function(req, res) {
    var quiz_id = req.params.quiz_id;
    var n_question = req.params.question;
    // find quiz by id using mongoose
    Quiz.findById(quiz_id, function(err, quiz) {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err)
            return
        }
        res.json(quiz.questions[n_question]); // return selected question from quiz as JSON
    });
});

module.exports = router;