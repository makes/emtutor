const express = require('express');
const Quiz = require('../models/quiz.js');

const router = express.Router();

router.get('/', (req, res) => {
    // get all quizzes in the database using mongoose
    Quiz.find((err, quizzes) => {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(quizzes); // return all quizzes as JSON
    });
});

module.exports = router;
