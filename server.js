const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const browserify = require('browserify-middleware');
const mongoose = require('mongoose');

const app = express();

const questions = require('./server/routes/questions.js');
const question = require('./server/routes/question.js');
const quizzes = require('./server/routes/quizzes.js');
const quiz = require('./server/routes/quiz.js');

const port = process.env.PORT || 1337;

const dbURI = 'mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true';

mongoose.connect(dbURI, { dbName: 'emtutor', useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (err) => {
    if (err) { // couldn't connect
        console.log('Database connection failed.');
    }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(compression());

//  Connect all our routes to our application
app.use('/api/questions', questions); // no real use for this
app.use('/api/quizzes', quizzes);
app.use('/api/quiz', quiz);
app.use('/api/quiz', question);

app.get('/index.js', browserify('client/index.js'));
app.use(express.static(`${__dirname}/client/public`)); // static files to be served

app.get('*', (req, res) => {
    res.sendFile('./client/public/index.html', { root: __dirname });
});

db.once('open', () => {
    app.listen(port);
    console.log(`Server running on port ${port}`);
});
