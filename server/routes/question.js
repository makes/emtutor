const express = require('express');
const Quiz = require('../models/quiz.js');

const router = express.Router();

router.get('/:quiz_id/:question', (req, res) => {
    const quizId = req.params.quiz_id;
    const questionNum = req.params.question;
    // find quiz by id using mongoose
    Quiz.findById(quizId, (err, quiz) => {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
            return;
        }
        res.json(quiz.questions[questionNum]); // return selected question from quiz as JSON
    });
});

module.exports = router;
