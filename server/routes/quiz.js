const express = require('express');
const Quiz = require('../models/quiz.js');

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // find quiz by id using mongoose
    Quiz.findById(id, (err, quiz) => {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(quiz); // return quiz as JSON
    });
});

module.exports = router;
