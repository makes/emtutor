var express = require('express');
var Quiz = require("../models/quiz.js");

var router = express.Router();

router.get('/:id', function(req, res) {
    var id = req.params.id;
    // find quiz by id using mongoose
    Quiz.findById(id, function(err, quiz) {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err)
        }
        res.json(quiz); // return quiz as JSON
    });
});

module.exports = router;