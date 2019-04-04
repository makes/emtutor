var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    id: String,
    title: String,
    choices: [{ title: String, feedback: String }]
}, { collection: 'questions' });

module.exports = mongoose.model('question', questionSchema);