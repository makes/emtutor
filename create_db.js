var mongoose = require('mongoose');
var Quiz = require('./server/models/quiz');

const db_uri = 'mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true';

var questions = [];

questions.push({ title: 'Millainen P-aalto?', choices: [ {title: 'Positiivinen', feedback: 'Jees!'}, {title: 'Bifaasinen', feedback: 'Väärin meni'}, {title: 'Negatiivinen', feedback: 'Väärin meni'}, {title: 'Ei P-aaltoja', feedback: 'Väärin meni'}] });
questions.push({ title: 'Onko rytmi säännöllinen?', choices: [ {title: 'Kyllä', feedback: 'Oikein'}, {title: 'Ei', feedback: 'Onpas!'} ] });
questions.push({ title: 'Millainen QRS-kompleksi?', choices: [ {title: 'Kapea', feedback: 'Oikein'}, {title: 'Leveä', feedback: 'Väärin'} ] });
questions.push({ title: 'Mitä voit päätellä tämän QRS-kompleksin kestosta?', choices: [ {title: 'Aktivaatio kulkee normaalisti johtoratoja pitkin.', feedback: 'Oikein'}, {title: 'Vasen kammio on laajentunut.', feedback: 'Väärin'} ] });
questions.push({ title: 'Millainen on käyrän ST-väli?', choices: [ {title: 'ST-nousua', feedback: 'Väärin'}, {title: 'Normaali', feedback: 'Oikein'}, {title: 'ST-laskua', feedback: 'Väärin'}, {title: 'Varhainen repolarisaatio', feedback: 'Väärin'}] });
questions.push({ title: 'Millainen T-aalto?', choices: [ {title: 'Hyperakuutti', feedback: 'Väärin'}, {title: 'Normaali', feedback: 'Oikein'}, {title: 'Invertoitunut', feedback: 'Väärin'}] });
questions.push({ title: 'Mikä rytmi?', choices: [ {title: 'Kammiotakykardia', feedback: 'Väärin'}, {title: 'Sinusrytmi', feedback: 'Oikein'}, {title: 'Eteisvärinä', feedback: 'Väärin'}] });

var quizzes = [];

quizzes.push(new Quiz({ title: 'ECG quiz!', description: 'this is an ecg quiz.', questions: questions}));

questions = [];

questions.push({ title: 'Test question 0', choices: [ {title: 'Test answer 0', feedback: 'Test feedback 0'}, {title: 'Test answer 1', feedback: 'Test feedback 1'}] });
questions.push({ title: 'Test question 1', choices: [ {title: 'Test answer 2', feedback: 'Test feedback 2'}, {title: 'Test answer 3', feedback: 'Test feedback 3'}] });

quizzes.push(new Quiz({ title: 'TEST quiz!', description: 'this is a test quiz.', questions: questions}));

questions = [];

questions.push({ title: 'Test question 2', choices: [ {title: 'Test answer 4', feedback: 'Test feedback 4'}, {title: 'Test answer 5', feedback: 'Test feedback 5'}] });
questions.push({ title: 'Test question 3', choices: [ {title: 'Test answer 6', feedback: 'Test feedback 6'}, {title: 'Test answer 7', feedback: 'Test feedback 7'}] });

quizzes.push(new Quiz({ title: 'TEST quiz 2!', description: 'this is another test quiz.', questions: questions}));

async function buildDatabase() {
    await mongoose.connect(db_uri, {dbName: 'emtutor', useNewUrlParser: true})

    try {
        await Quiz.collection.drop()
    } catch (e) {
        if (e.code === 26) {
            console.log('namespace %s not found', Quiz.collection.name)
        } else {
            throw e;
        }
    }
    await Quiz.insertMany(quizzes)
    await mongoose.disconnect();
}

buildDatabase();