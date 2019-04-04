var mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({
    title: String,
    description: String,
    questions: [{
        id: String,
        title: String,
        choices: [{ title: String, feedback: String }],
    }],
}, { collection: 'quizzes' });

module.exports = mongoose.model('quiz', quizSchema);