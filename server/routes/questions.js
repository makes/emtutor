const express = require('express');
const question = require('../models/question.js');

const router = express.Router();

router.get('/', (req, res) => {
    // get all questions in the database using mongoose
    question.find((err, questions) => {
        // if there is an error, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(questions); // return all questions as JSON
    });
});

module.exports = router;
